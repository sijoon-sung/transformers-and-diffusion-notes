"""원본 강의 PDF의 지정 페이지를 PNG로 캡처.

설치: pip install pypdfium2
실행: python tools/extract_ch01_slides.py "path/to/fall26-cme295-lecture1.pdf"
페이지 번호는 PDF 뷰어 기준 1부터 시작. 슬라이드 내용은 수정하지 않음.
"""
import argparse
from pathlib import Path
import pypdfium2 as pdfium

PAGES = {
    24: "slide-024-tokenization.png",
    27: "slide-027-subword.png",
    33: "slide-033-embedding.png",
    45: "slide-045-rnn.png",
    61: "slide-061-qkv.png",
    62: "slide-062-attention.png",
    64: "slide-064-transformer.png",
    68: "slide-068-position.png",
    72: "slide-072-output.png",
    73: "slide-073-residual.png",
    75: "slide-075-mask.png",
    76: "slide-076-multihead.png",
}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("pdf", type=Path)
    args = parser.parse_args()
    out = Path(__file__).resolve().parents[1] / "assets" / "ch01"
    out.mkdir(parents=True, exist_ok=True)
    doc = pdfium.PdfDocument(args.pdf)
    for number, name in PAGES.items():
        page = doc[number-1]
        bitmap = page.render(scale=2)
        bitmap.to_pil().convert("RGB").save(out / name)
        bitmap.close()
        page.close()
    doc.close()
    print(f"Captured {len(PAGES)} original slides")


if __name__ == "__main__":
    main()
