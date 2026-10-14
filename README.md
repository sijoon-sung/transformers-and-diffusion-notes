# Transformer와 Diffusion 공부 노트

Stanford CME 295와 CME 296 공개 자료를 참고한 개인 학습 기록.
개념을 작은 숫자나 문장 예제로 풀어보며 정리.
이 웹페이지와 정리 노트는 Google Gemini와 함께 제작되었습니다.

용어만 외우면 설명하기 어려워서, 작은 문장이나 숫자를 넣어서 정리.
헷갈리는 부분에서는 질문을 던지고, 바로 작은 예제나 계산으로 답을 붙이는 식.

🌐 **[웹페이지(GitHub Pages) 바로가기](https://sijoon-sung.github.io/transformers-and-diffusion-notes/)**

## CME 295 · Transformer와 LLM

| 단원 | 내용 |
| --- | --- |
| 1 | [문장이 Transformer를 통과하는 과정](https://sijoon-sung.github.io/transformers-and-diffusion-notes/site/notes--01-transformer-basics.html) |
| 2 | [Transformer의 구조를 바꾸는 방법](https://sijoon-sung.github.io/transformers-and-diffusion-notes/site/notes--cme295--02-model-variants.html) |
| 3 | [토큰을 고르고 생성 비용을 줄이기](https://sijoon-sung.github.io/transformers-and-diffusion-notes/site/notes--cme295--03-generation-and-inference.html) |
| 4 | [사전학습과 튜닝 그리고 LoRA](https://sijoon-sung.github.io/transformers-and-diffusion-notes/site/notes--cme295--04-training-and-lora.html) |
| 5 | [더 나은 답변을 고르는 기준 학습하기](https://sijoon-sung.github.io/transformers-and-diffusion-notes/site/notes--cme295--05-preference-tuning.html) |
| 6 | [답을 내기 전에 계산을 더 쓰는 모델](https://sijoon-sung.github.io/transformers-and-diffusion-notes/site/notes--cme295--06-reasoning-models.html) |
| 7 | [문서를 찾고 도구를 사용하는 LLM](https://sijoon-sung.github.io/transformers-and-diffusion-notes/site/notes--cme295--07-rag-and-agents.html) |
| 8 | [모델이 좋아졌다는 걸 어떻게 확인할까](https://sijoon-sung.github.io/transformers-and-diffusion-notes/site/notes--cme295--08-evaluation.html) |
| 9 | [텍스트 밖으로 확장되는 Transformer](https://sijoon-sung.github.io/transformers-and-diffusion-notes/site/notes--cme295--09-vision-and-diffusion.html) |

[보충 · Attention에서 Q K V가 하는 일](https://sijoon-sung.github.io/transformers-and-diffusion-notes/site/notes--01-attention-qkv.html)

1·2단원은 Fall 2026, 3~9단원은 Fall 2025 슬라이드 기준.
2단원의 BERT 부분은 Fall 2025 자료도 참고. 연도가 달라 일부 주제가 겹침.

## CME 296 · Diffusion과 Vision Model

| 단원 | 내용 |
| --- | --- |
| 1 | [노이즈에서 이미지를 만드는 과정](https://sijoon-sung.github.io/transformers-and-diffusion-notes/site/notes--cme296--01-ddpm-and-ddim.html) |
| 2 | [Score로 복원 방향 찾기](https://sijoon-sung.github.io/transformers-and-diffusion-notes/site/notes--cme296--02-score-and-sde.html) |
| 3 | [노이즈를 데이터로 옮기는 속도 학습하기](https://sijoon-sung.github.io/transformers-and-diffusion-notes/site/notes--cme296--03-flow-matching.html) |
| 4 | [작은 공간에서 생성하고 텍스트로 방향 잡기](https://sijoon-sung.github.io/transformers-and-diffusion-notes/site/notes--cme296--04-latent-and-conditioning.html) |
| 5 | [노이즈를 예측하는 모델 안쪽](https://sijoon-sung.github.io/transformers-and-diffusion-notes/site/notes--cme296--05-unet-and-dit.html) |
| 6 | [생성 품질을 높이고 step 줄이기](https://sijoon-sung.github.io/transformers-and-diffusion-notes/site/notes--cme296--06-training-and-distillation.html) |
| 7 | [잘 생성된 이미지인지 평가하기](https://sijoon-sung.github.io/transformers-and-diffusion-notes/site/notes--cme296--07-image-evaluation.html) |
| 8 | [영상·편집·텍스트로 넓혀보기](https://sijoon-sung.github.io/transformers-and-diffusion-notes/site/notes--cme296--08-video-editing-and-text.html) |

Spring 2026 슬라이드 기준.

## 참고 자료

- [Stanford CME 295 — Transformers & Large Language Models](https://cme295.stanford.edu/)
- [Stanford CME 296 — Diffusion & Large Vision Models](https://cme296.stanford.edu/)

본문의 작은 숫자와 가상 상황은 개념을 풀어보기 위한 예제.
직접 모델을 학습하거나 성능을 측정한 실험 결과와는 구분.

