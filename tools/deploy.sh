#!/usr/bin/env bash
#
# 部署 KST POWER 静态站到自有服务器(43.157.43.105 / nginx)。
#
# 用法:
#   ./tools/deploy.sh            正式部署
#   ./tools/deploy.sh --dry-run  只看会同步/删除哪些文件,不真改
#
# 前提:部署密钥已装到服务器(一次性:ssh-copy-id -i ~/.ssh/kst_deploy_ed25519.pub root@43.157.43.105)
#
# 只传"要上线的静态产物";源文件与开发文件不上服务器。
# 用 --delete 清理服务器上的陈旧文件(如旧的 .DS_Store 垃圾),但排除服务器自管文件。
set -euo pipefail

SERVER="root@43.157.43.105"
KEY="$HOME/.ssh/kst_deploy_ed25519"
WEBROOT="/home/wwwroot/default"
SITE="http://43.157.43.105"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

DRY=""
[ "${1:-}" = "--dry-run" ] && DRY="--dry-run"

command -v rsync >/dev/null || { echo "缺 rsync"; exit 1; }
[ -f "$KEY" ] || { echo "缺部署密钥 $KEY"; exit 1; }

echo "▸ 部署源: $ROOT"
echo "▸ 目标:   $SERVER:$WEBROOT"
[ -n "$DRY" ] && echo "▸ (dry-run,不会真改)"

# --delete: 服务器上多出来的文件删掉,保持与本地一致
# 排除:1) 源/开发文件(不上线)  2) 服务器自管文件(.user.ini 等,删了会出事)
rsync -az --delete $DRY \
  -e "ssh -i $KEY -o IdentitiesOnly=yes -o BatchMode=yes" \
  --exclude='.git' \
  --exclude='.gitignore' \
  --exclude='tools' \
  --exclude='content' \
  --exclude='docs' \
  --exclude='contact.config.json' \
  --exclude='TODO.md' \
  --exclude='_*.html' \
  --exclude='.DS_Store' \
  --exclude='._*' \
  --exclude='.claude' \
  --exclude='.user.ini' \
  --exclude='.well-known' \
  "$ROOT/" "$SERVER:$WEBROOT/"

if [ -n "$DRY" ]; then
  echo "▸ dry-run 结束。去掉 --dry-run 正式部署。"
  exit 0
fi

echo "▸ 部署完成,curl 线上验证关键改动..."
fail=0
check() { # 描述 URL 期望grep
  local n="$3"; local c; c=$(curl -s -m 10 "$2" | grep -c "$3" || true)
  if [ "$c" -ge 1 ]; then echo "  ✓ $1"; else echo "  ✗ $1  ($2 未命中 '$3')"; fail=1; fi
}
check "首页可访问"        "$SITE/index.html"  "KST"
check "CONTACT US 水印"   "$SITE/index.html"  "clamp(52px,9vw,132px)"
check "俄语已上"          "$SITE/engines.html" 'class="ru"'
check "新闻详情页存在"    "$SITE/news/2025-05-25th-china-intl-petroleum.html" "KST"
# 邮箱域名核对
check "联系邮箱"          "$SITE/about.html"  "sales@kst-power.com"

if [ "$fail" = 0 ]; then echo "▸ 全部验证通过 ✅"; else echo "▸ 有验证未通过 ⚠️  检查上面 ✗ 项"; exit 1; fi
