declare const ml5: any;

const upload = document.getElementById("imageUpload") as HTMLInputElement;
const preview = document.getElementById("preview") as HTMLImageElement;
const memoryDiv = document.getElementById("memory") as HTMLDivElement;

let classifier: any;

// AIモデル（MobileNet）の読み込み
memoryDiv.innerText = "AIモデルを読み込み中です...";
ml5.imageClassifier('MobileNet')
    .then((loadedClassifier: any) => {
        classifier = loadedClassifier;
        console.log('MobileNet Model Loaded!');
        memoryDiv.innerText = "AIモデルの準備が完了しました。画像を選択してください。";
    })
    .catch((err: any) => {
        console.error("Model load error:", err);
        memoryDiv.innerText = "AIモデルの読み込みに失敗しました。";
    });

upload.addEventListener("change", function(){
    const file = upload.files?.[0];
    if(!file) return;

    const reader = new FileReader();

    reader.onload = function(e){
        const result = e.target?.result as string;
        
        // 画像読み込み完了後に推論を実行
        preview.onload = async () => {
            await generateMemory();
        };
        
        preview.src = result;
    }

    reader.readAsDataURL(file);
});

async function generateMemory() {
    if (!classifier) {
        memoryDiv.innerText = "AIモデルを読み込み中です。少し待ってから再度お試しください。";
        return;
    }

    memoryDiv.innerText = "AIが画像を分析しています...";

    try {
        const results = await classifier.classify(preview);
        
        if (results && results.length > 0) {
            const label = results[0].label.toLowerCase();
            console.log("AI Classification:", results);
            const text = createMemoryFromLabel(label);
            memoryDiv.innerText = text;
        } else {
            memoryDiv.innerText = "AI「なんだろうこれ…でも、不思議と懐かしい気がします。」";
        }
    } catch (error: any) {
        console.error("ml5 error:", error);
        memoryDiv.innerText = "エラーが発生しました: " + error.message;
    }
}

function createMemoryFromLabel(label: string): string {
    // MobileNetの推論ラベルに基づくエモーショナルな思い出の辞書
    const memories: Record<string, string[]> = {
        "dog": [
            "君が走り回る姿を、ずっと見つめていたあの午後。",
            "泥だらけになって帰ってきた日、なぜか誇らしげだったね。"
        ],
        "cat": [
            "窓辺で丸くなる君の背中。あの穏やかな時間は宝物です。",
            "気まぐれに甘えてくれる瞬間が、私の世界を優しくしてくれた。"
        ],
        "car": [
            "あの車で海まで走った夜のこと、風の匂いと一緒に思い出す。",
            "行き先も決めずに走り出したドライブ。自由とはあの時のことだった。"
        ],
        "ocean": [
            "波の音だけが聞こえていたあの海辺で、私たちは何も語らなかった。",
            "足元をさらう波の冷たさと、心臓が高鳴る音だけが残っている。"
        ],
        "seashore": [
            "波の音だけが聞こえていたあの海辺で、私たちは何も語らなかった。",
            "足元をさらう波の冷たさと、心臓が高鳴る音だけが残っている。"
        ],
        "mountain": [
            "頂上からの景色を見たとき、すべての悩みがちっぽけに思えたんだ。",
            "澄んだ空気の中で深く深呼吸をした、あの日の記憶。"
        ],
        "coffee": [
            "コーヒーの香りに包まれながら、君と交わした他愛もない会話。",
            "少し冷めたコーヒーカップを握りしめた、あの冬の午後。"
        ],
        "cup": [
            "コーヒーの香りに包まれながら、君と交わした他愛もない会話。",
            "少し冷めたコーヒーカップを握りしめた、あの冬の午後。"
        ],
        "book": [
            "ページをめくる音だけが響く静かな部屋で、君の横顔を盗み見ていた。",
            "その本に挟まった栞を見るたび、あの日の君の笑顔が蘇る。"
        ],
        "keyboard": [
            "深夜まで響いていたタイピング音が、なぜか安心させてくれたんだ。",
            "君が夢中で画面に向かっていたあの夜、私は隣で眠りについていた。"
        ],
        "computer": [
            "深夜まで響いていたタイピング音が、なぜか安心させてくれたんだ。",
            "君が夢中で画面に向かっていたあの夜、私は隣で眠りについていた。"
        ],
        "food": [
            "「美味しいね」って笑い合ったあの食卓。もう二度と戻らない特別な時間。",
            "少し焦げた匂いすら、今となっては愛おしい記憶。"
        ]
    };

    // キーワードマッチング
    for (const key in memories) {
        if (label.includes(key)) {
            const options = memories[key];
            const randomIndex = Math.floor(Math.random() * options.length);
            return options[randomIndex];
        }
    }

    return "色褪せないその景色の中に、私の知らない君が笑っている気がする。";
}