from pathlib import Path
text = Path('components/hero.tsx').read_text(encoding='utf-8')
start = text.index('const probabilityKeyOrder')
print(repr(text[start:start+200]))
