### GameManager

### CardManager

### CardView

### FlipManager

### TurnManager

- そう、ターンはもう全て static にしてしまえば？と思う
- 結局たまっていくデータを監視する役割だから。
- フリップするたびに情報を格納、
- 最初かそうでないかだけは判別...でもやっぱりそうするとTurnManagerがあったほうがわかりやすいのかな。

### SoundManager

- static variables
  - flip
  - match
  - not-match
  - finish
- static method
  - playFlipSound()
  - playMatchSound()
  - playNotMatchSound()
  - playFinishSound()

### MessageManager

- static variables
  - メッセージを固定する
  - 表示先を指定
    - ターンの数表示場所
    - 実況中継
- static method
  - showResult()
    - お疲れ様的メッセージ
  - show
    うーん

TypeScriptDocs
