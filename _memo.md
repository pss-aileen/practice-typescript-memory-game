もう一度役割を整理する

- DOM を保持しておいた方がよいって
- いちいち DOM 検索をしているとそのたびにクエリ発行が必要らしい
  - 大規模なページではコストとなるって

---

### GameManager

- game というフィールドだけ準備
- その中の dom は JavaScript で生成することとする
- 初期化
  - MessageManager の初期化
  - CardManager の初期化
  - TurnManager の初期化

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
    - オブジェクト生成するたびに、インスタンスができるから。
  - 1 つめを選ぶ、データを格納
  - 2 つ目を選ぶ。データを格納
  - 1 つ目と 2 つ目のデータを比較
    - 同じ -> ひっくりかえしたまま
    - 違う -> 元に戻す
- 最初は無条件にインスタンスを作成する
- flip が 2 回目が終わった時にインスタンスを作成する必要がある
- とりあえず実装してみる？

### CardView

- カードの UI と機能を実装する
- ~~カードを生成するたびに、要素を CardManager に格納していく~~
- UI に関する動きなのか、機能的なものなのかわけたいね...。
- フリップ系の動き、うーんうーんうーん
- とりあえず今の状態で一回構築してみようか
- variables
  - suit
  - strength
  - element
  - cardId
- method
  - private initialize()
  - private createElement()
  - getElement()
  - flip()
    - フリップする時に、CardManager ではなく、Turn に格納していく
    - CardManager を経由しない謎に...いや...うーんまぁ考えよう
    - で、ここでフリップしたら、Turn のオブジェクトに値を追加する
    - やっぱりでも Turn に番号を渡すためには番号が必要...？
    - いや、Turn の配列の長さを取得して、それに入れていけばいい
    - んで、カウントを見る。
    - そして、2 回目の時に、makeTurn をすれば、連動する？
    - オブジェクトの数が増えてるから自動にやれるかも
  - beFlipped()
    - 全部のカードが disabled になる
  - beNotFlipped()
    - 全部のカードがアクティブになる
  - makeTurn()
    - 2 回目のフリップの時に、新たにターンを作る

### CardFunctions

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

### FlipManager

- カードをひっくり返した動きから発生するあれこれを管理
  -> これは CardView が担ってくれるから、なくてもいい...！？

### SoundManager

- static variables
  - flip
  - match
  - not-match
  - finish
  - これも要素として自分で dom 追加したほうがいいかも？
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
