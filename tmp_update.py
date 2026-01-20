from pathlib import Path
path = Path('components/hero.tsx')
text = path.read_text(encoding='utf-8')
needle_start = text.index('const probabilityKeyOrder')
if needle_start == -1:
    raise SystemExit('probabilityKeyOrder not found')
insert_point = text.find('\n\n', needle_start)
if insert_point == -1:
    raise SystemExit('blank line not found after probability list')
insert_point += 2
extras = 'const MAX_UPLOAD_SIDE = 1024\nconst MAX_UPLOAD_SIZE = 2 * 1024 * 1024 // 2 MB\n\n'
if extras.strip() in text:
    raise SystemExit('extras already inserted')
text = text[:insert_point] + extras + text[insert_point:]
old_sig = 'async function resizeImageFile(file: File, maxSide = 512): Promise<string>'
new_sig = 'async function resizeImageFile(file: File, maxSide = MAX_UPLOAD_SIDE): Promise<string>'
if old_sig not in text:
    raise SystemExit('old signature missing')
text = text.replace(old_sig, new_sig, 1)
path.write_text(text, encoding='utf-8')
