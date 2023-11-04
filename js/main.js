// import * as XLSX from "xlsx";
let isStart = false;
// Select The Start Game Button
document.querySelector(".control-buttons span").onclick = function () {
  // Prompt Window To Ask For Name
  let yourName = prompt("What's Your Name ?");
  let yourEmail = prompt("What's your email ?");
  let yourNumber = prompt("What's your Number ?");
  // If Name Is Empty
  if (yourName == null || yourName == "") {
    // Set Name To Unknown
    document.querySelector(".name span").innerHTML = "Unknown";

    // Name Is Not Empty
  } else {
    // Set Name To Your Name
    document.querySelector(".name span").innerHTML = yourName;
    // Update
    // const workbook = XLSX.readFile("../CustomerInfo.xlsx");
    // const worksheet = workbook.Sheets["Info"];
    // const lastRow = XLSX.utils.decode_range(worksheet["!ref"]).e.r;
    // const newData = [
    //   [yourName, yourEmail, yourNumber], // Row 1
    //   // Add more rows as needed
    // ];
    // const newRows = XLSX.utils.sheet_add_aoa(worksheet, newData, {
    //   origin: -1,
    // });
    // worksheet["!ref"] = XLSX.utils.encode_range({
    //   s: { c: 0, r: 0 },
    //   e: {
    //     c: XLSX.utils.decode_range(worksheet["!ref"]).e.c,
    //     r: lastRow + newRows,
    //   },
    // });
    // XLSX.writeFile(workbook, "../CustomerInfo.xlsx");

    // const workbook = XLSX.utils.book_new();
    // const worksheet = XLSX.utils.aoa_to_sheet([
    //   ["Name", "Email", "Number"], // Header row
    //   [yourName, yourEmail, yourNumber], // Data row
    // ]);
    // XLSX.utils.book_append_sheet(workbook, worksheet, "Info");
    // const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    // saveAs(
    //   new Blob([wbout], { type: "application/octet-stream" }),
    //   "CustomerInfo.xlsx"
    // );
  }

  // Remove Splash Screen
  document.querySelector(".control-buttons").remove();
  blocks.forEach((block, index) => {
    block.classList.add("is-flipped");
  });

  setTimeout(() => {
    blocks.forEach((block, index) => {
      block.classList.remove("is-flipped");
    });
  }, 3000);
};

// Effect Duration
let duration = 500;

// Select Blocks Container
let blocksContainer = document.querySelector(".memory-game-blocks");

// Create Array From Game Blocks
let blocks = Array.from(blocksContainer.children);
if (isStart == true) {
}
// Create Range Of Keys
// let orderRange = [...Array(blocks.length).keys()];

let orderRange = Array.from(Array(blocks.length).keys());

// console.log(orderRange);
shuffle(orderRange);
// console.log(orderRange);

// Add Order Css Property To Game Blocks
blocks.forEach((block, index) => {
  // Add CSS Order Property
  block.style.order = orderRange[index];

  // Add Click Event
  block.addEventListener("click", function () {
    // Trigger The Flip Block Function
    flipBlock(block);
  });
});

// Flip Block Function
function flipBlock(selectedBlock) {
  // Add Class is-flipped
  selectedBlock.classList.add("is-flipped");

  // Collect All Flipped Cards
  let allFlippedBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );

  // If Theres Two Selected Blocks
  if (allFlippedBlocks.length === 2) {
    // console.log('Two Flipped Blocks Selected');

    // Stop Clicking Function
    stopClicking();

    // Check Matched Block Function
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}

// Stop Clicking Function
function stopClicking() {
  // Add Class No Clicking on Main Container
  blocksContainer.classList.add("no-clicking");

  // Wait Duration
  setTimeout(() => {
    // Remove Class No Clicking After The Duration
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}

// Check Matched Block
function checkMatchedBlocks(firstBlock, secondBlock) {
  let triesElement = document.querySelector(".tries span");

  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");

    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");

    setTimeout(() => {
      // firstBlock.classList.add("disappear");
      // secondBlock.classList.add("disappear");
      // firstBlock.classList.remove("has-match");
      // secondBlock.classList.remove("has-match");
      // firstBlock.style.transition = ".6s ease opacity,.6s ease transform";
      // secondBlock.style.transition = ".6s ease opacity,.6s ease transform";
      // firstBlock.classList.remove("has-match");
      // secondBlock.classList.remove("has-match");
      firstBlock.style.opacity = 0;
      secondBlock.style.opacity = 0;
      firstBlock.style.transform = "scale(0)";
      secondBlock.style.transform = "scale(0)";
      firstBlock.style.transition = ".6s ease opacity,.6s ease transform";
      secondBlock.style.transition = ".6s ease opacity,.6s ease transform";
    }, 1000);
    document.getElementById("success").play();
    let gameCounter = 0;
    blocks.forEach((block) => {
      console.log(gameCounter);
      if (block.classList.contains("has-match")) {
        gameCounter++;
        if (gameCounter == 12) {
          document.getElementById("FinalSuccess").play();
          let allBlock = document.querySelector(".memory-game-blocks");
          let Gif = document.querySelector(".success-panel");
          allBlock.style.display = "none";
          Gif.style.display = "block";
        }
      }
    });
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, duration);

    document.getElementById("fail").play();
  }
}

// Shuffle Function
function shuffle(array) {
  // Settings Vars
  let current = array.length,
    temp,
    random;

  while (current > 0) {
    // Get Random Number
    random = Math.floor(Math.random() * current);

    // Decrease Length By One
    current--;

    // [1] Save Current Element in Stash
    temp = array[current];

    // [2] Current Element = Random Element
    array[current] = array[random];

    // [3] Random Element = Get Element From Stash
    array[random] = temp;
  }
  return array;
}

// Current Array [9, 2, 10, 4, 5, 6, 7, 3, 1, 8]
/*
  [1] Save Current Element in Stash
  [2] Current Element = Random Element
  [3] Random Element = Get Element From Stash
*/
const imgPaths = ["GoLimoCopy.jpg", "GoMiniCopy.jpg", "GoBusCopy.jpg"];

let currentIndex = 0;
function SwitchBackgroundImage() {
  const backgroundContainer = document.querySelector(".control-buttons");
  backgroundContainer.style.backgroundImage = `url(imgs/${imgPaths[currentIndex]})`;
  currentIndex = (currentIndex + 1) % imgPaths.length;
}
setInterval(() => {
  SwitchBackgroundImage();
}, 2000);
