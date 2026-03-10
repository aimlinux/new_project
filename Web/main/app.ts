const upload = document.getElementById("imageUpload") as HTMLInputElement;
const preview = document.getElementById("preview") as HTMLImageElement;
const memoryDiv = document.getElementById("memory") as HTMLDivElement;

const memories = [
"夏の日、友達と笑いながら歩いた。",
"静かな場所で風を感じていた。",
"新しい場所を見つけてワクワクしていた。",
"夕日を眺めながらゆっくり過ごしていた。",
"この瞬間がずっと続けばいいと思った。"
];

upload.addEventListener("change", function(){

    const file = upload.files?.[0];

    if(!file) return;

    const reader = new FileReader();

    reader.onload = function(e){

        preview.src = e.target?.result as string;

        generateMemory();

    }

    reader.readAsDataURL(file);

});


function generateMemory(){

    const random = Math.floor(Math.random() * memories.length);

    memoryDiv.innerText = memories[random];

}