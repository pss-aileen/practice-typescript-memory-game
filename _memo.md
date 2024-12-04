もう一度役割を整理する

- DOM を保持しておいた方がよいって
- いちいち DOM 検索をしているとそのたびにクエリ発行が必要らしい
  - 大規模なページではコストとなるって

---

### GameManager

- 初期化
  - MessageManagerの初期化
  - CardManagerの初期化

### CardManager

- カード情報からカード一覧を生成する
- 場にあるカードの全てを無効化する（一時クリック防止のため）
- 場にあるカードの全てを有効化する（一時クリック防止のため）
- variables
  - static CardList from CardView
- method
  - disableByAttribute()
  - activeByAttribute()
  - disableByStyle()
    - to prevent user from click cards while checking cards. (cursor-event: none)
  - activeByStyle()
    - after checking cards, these will be activeted.

### CardView

- カードの UI と機能を実装する
- カードを生成するたびに、要素を CardManager に格納していく
- variables
  - suit
  - strength
  - element
  - cardId
- method
  - private initialize()
  - private createElement()
  - getElement()
  - disable()
    - 全部のカードが disabled になる
  - active()
    - 全部のカードがアクティブになる

### CardData

- カードのデータを加工、データを返す
- variables
  - static private suiteTypes
  - static private strengthTypes
  - static private initialCards
  - selectedCard
- method
  - static private generateCardArray()
  - shuffleCards(array)
  - selectCard(array, number)

### TurnManager

- そう、ターンはもう全て static にしてしまえば？と思う
- 結局たまっていくデータを監視する役割だから。
- フリップするたびに情報を格納、
- 最初かそうでないかだけは判別...でもやっぱりそうすると TurnManager があったほうがわかりやすいのかな。

- こうすればフリップの回数を数える必要はない
- ターン数はターン作成ではかることができる
- ターン作成
  - オブジェクトを仮作成、配列に追加
  - 現在のターンのオブジェクトを管理するので、いちいち find しなくていい、たぶん
  - 1 つめを選ぶ、データを格納
  - 2 つ目を選ぶ。データを格納
  - 1 つ目と 2 つ目のデータを比較
    - 同じ -> ひっくりかえしたまま
    - 違う -> 元に戻す

### FlipManager

- カードをひっくり返した動きから発生するあれこれを管理
  -> これは CardView が担ってくれるから、なくてもいい...！？

### SoundManager

- static variables
  - flip
  - match
  - not-match
  - finish
  - これも要素として自分でdom追加したほうがいいかも？
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
  - initialize()
  - appendElement(elementId)
  - createMessageElement()
  - createTurnElement()
  - showMessage("congrations", output 先)
  - あー message のところすら、DOM 生成にしたほうがいいのかな。チケット発行より。
  - ↑ メッセージいれたら、それごとに出汁分けてくれる？
  - いやー。それだと大変そうだから、やっぱりメソッドにしよう。それぞれ

TypeScriptDocs

---
