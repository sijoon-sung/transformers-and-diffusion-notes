"""원본 슬라이드 캡처. python tools/extract_course_slides.py "강의 자료 폴더"

의존성: pypdfium2. 강의 슬라이드의 내용과 출처 표기를 그대로 유지.
"""
import argparse
from pathlib import Path
import pypdfium2 as pdfium

SPECS = [
    (295, 2026, 2, [8,20,28,41,70,82,88,108,134]),
    (295, 2025, 2, [79,102,107]),
    (295, 2025, 3, [25,58,85,100,108,110,119,122]),
    (295, 2025, 4, [17,39,43,59,79,92,106,126]),
    (295, 2025, 5, [19,33,43,54,66,92,101]),
    (295, 2025, 6, [20,47,60,79,94,119,134,144]),
    (295, 2025, 7, [24,33,47,62,74,93,114,134]),
    (295, 2025, 8, [13,33,46,63,67,91,132,156,164]),
    (295, 2025, 9, [53,62,65,68,92,121]),
    (296, 2026, 1, [37,46,50,71,81,85,94,108,116]),
    (296, 2026, 2, [23,30,34,45,51,62,83,102,110,115]),
    (296, 2026, 3, [10,17,28,43,57,66,71,82,94]),
    (296, 2026, 4, [12,22,37,52,58,82,116,136,145]),
    (296, 2026, 5, [26,35,48,50,72,109,133,161]),
    (296, 2026, 6, [22,31,38,44,57,72,92,111,119]),
    (296, 2026, 7, [29,33,52,58,64,75,96,104,121]),
    (296, 2026, 8, [53,58,65,75,79,85,102]),
]


def source_path(base, course, year, lecture):
    folder = 'CME 295 - Transformers & LLMs' if course == 295 else 'CME 296 - Diffusion & Large Vision Models'
    term = 'Fall' if course == 295 else 'Spring'
    filename = f'{term.lower()}{str(year)[2:]}-cme{course}-lecture{lecture}.pdf'
    return base / folder / 'Lecture Slides' / f'{term} {year}' / filename


def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('source_root', type=Path)
    args=parser.parse_args()
    root=Path(__file__).resolve().parents[1]
    sources=['# 슬라이드 캡처 출처', '', 'Afshine Amidi, Shervine Amidi의 Stanford CME 295 및 CME 296 강의 슬라이드.', '',
             '[CME 295](https://cme295.stanford.edu/) · [CME 296](https://cme296.stanford.edu/)', '',
             '[CME 295 1강 캡처 목록](ch01/SOURCES.md)', '', '| 원본 파일 | PDF 페이지 | 캡처 폴더 |', '| --- | --- | --- |']
    total=0
    for course,year,lecture,pages in SPECS:
        src=source_path(args.source_root,course,year,lecture)
        dest=root/'assets'/f'cme{course}'/f'{lecture:02d}'
        dest.mkdir(parents=True,exist_ok=True)
        doc=pdfium.PdfDocument(src)
        for number in pages:
            pg=doc[number-1]
            bitmap=pg.render(scale=2)
            bitmap.to_pil().convert('RGB').save(dest/f'{year}-{number:03d}.png')
            bitmap.close();pg.close();total+=1
        doc.close()
        sources.append(f'| {src.name} | {", ".join(map(str,pages))} | [cme{course}/{lecture:02d}](cme{course}/{lecture:02d}/) |')
    sources.extend(['', '페이지 번호는 PDF 뷰어 기준. 캡처 내부의 원저자 및 그림 출처 표기를 유지.',
                    '강의 자료와 구분되는 한국어 설명 및 작은 숫자 예제는 각 학습 노트에 작성.'])
    (root/'assets'/'SOURCES.md').write_text('\n'.join(sources)+'\n',encoding='utf-8')
    print(f'Captured {total} original slides.')


if __name__=='__main__':
    main()
