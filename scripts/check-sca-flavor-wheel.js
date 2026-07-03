const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const htmlPath = path.join(root, "docs", "tasting", "sca-flavor-wheel-guide.html");
const cssPath = path.join(root, "docs", "tasting", "assets", "sca-flavor-wheel-guide.css");
const dataPath = path.join(root, "docs", "tasting", "assets", "sca-flavor-wheel-data.js");
const wheelImagePath = path.join(root, "SCA-flavor-wheel", "SCAA_FlavorWheel.01.18.15.jpg");

const expectedLabels = [
  "Floral",
  "Chamomile",
  "Rose",
  "Jasmine",
  "Fruity",
  "Berry",
  "Blackberry",
  "Raspberry",
  "Blueberry",
  "Strawberry",
  "Dried Fruit",
  "Raisin",
  "Prune",
  "Other Fruit",
  "Coconut",
  "Cherry",
  "Pomegranate",
  "Pineapple",
  "Grape",
  "Apple",
  "Peach",
  "Pear",
  "Citrus Fruit",
  "Grapefruit",
  "Orange",
  "Lemon",
  "Lime",
  "Sour/Fermented",
  "Sour",
  "Sour Aromatics",
  "Acetic Acid",
  "Butyric Acid",
  "Isovaleric Acid",
  "Citric Acid",
  "Malic Acid",
  "Alcohol/Fermented",
  "Winey",
  "Whiskey",
  "Fermented",
  "Overripe",
  "Green/Vegetative",
  "Olive Oil",
  "Raw",
  "Beany",
  "Under-ripe",
  "Peapod",
  "Fresh",
  "Dark Green",
  "Vegetative",
  "Hay-like",
  "Herb-like",
  "Other",
  "Papery/Musty",
  "Stale",
  "Cardboard",
  "Papery",
  "Woody",
  "Moldy/Damp",
  "Musty/Dusty",
  "Musty/Earthy",
  "Animalic",
  "Meat Brothy",
  "Phenolic",
  "Chemical",
  "Bitter",
  "Salty",
  "Medicinal",
  "Petroleum",
  "Skunky",
  "Rubber",
  "Roasted",
  "Tobacco",
  "Pipe Tobacco",
  "Burnt",
  "Acrid",
  "Ashy",
  "Smoky",
  "Brown, Roast",
  "Cereal",
  "Grain",
  "Malt",
  "Spices",
  "Pungent",
  "Pepper",
  "Brown Spice",
  "Anise",
  "Nutmeg",
  "Cinnamon",
  "Clove",
  "Nutty/Cocoa",
  "Nutty",
  "Peanuts",
  "Hazelnut",
  "Almond",
  "Cocoa",
  "Chocolate",
  "Dark Chocolate",
  "Sweet",
  "Brown Sugar",
  "Molasses",
  "Maple Syrup",
  "Caramelized",
  "Honey",
  "Vanilla",
  "Vanillin",
  "Overall Sweet",
  "Sweet Aromatics",
  "Black Tea",
];

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function readRequiredFile(filePath) {
  assert(fs.existsSync(filePath), `Missing required file: ${path.relative(root, filePath)}`);
  return fs.readFileSync(filePath, "utf8");
}

function flattenNodes(nodes, trail = []) {
  return nodes.flatMap((node) => {
    const nextTrail = [...trail, node.en];
    return [
      {
        ...node,
        path: nextTrail.join(" > "),
      },
      ...flattenNodes(node.children || [], nextTrail),
    ];
  });
}

readRequiredFile(wheelImagePath);
const html = readRequiredFile(htmlPath);
readRequiredFile(cssPath);
const dataScript = readRequiredFile(dataPath);

const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(dataScript, sandbox, { filename: dataPath });

const data = sandbox.window.SCA_FLAVOR_WHEEL_DATA;
assert(data, "Data file must expose window.SCA_FLAVOR_WHEEL_DATA");
assert(Array.isArray(data.categories), "Data must include categories array");
assert(data.categories.length === 9, `Expected 9 inner categories, got ${data.categories.length}`);

const flattened = flattenNodes(data.categories);
const labels = new Set(flattened.map((node) => node.en));
const missingLabels = expectedLabels.filter((label) => !labels.has(label));
assert(missingLabels.length === 0, `Missing labels: ${missingLabels.join(", ")}`);

const missingZh = flattened.filter((node) => !node.zh || node.zh.trim().length === 0);
assert(missingZh.length === 0, `Labels missing Traditional Chinese translation: ${missingZh.map((node) => node.path).join(", ")}`);

const missingEmoji = flattened.filter((node) => !node.emoji || node.emoji.trim().length === 0);
assert(missingEmoji.length === 0, `Labels missing emoji/icon: ${missingEmoji.map((node) => node.path).join(", ")}`);

assert(html.includes("sca-flavor-wheel-guide.css"), "HTML must link the guide CSS");
assert(html.includes("sca-flavor-wheel-data.js"), "HTML must load the data file");
assert(html.includes("../../SCA-flavor-wheel/SCAA_FlavorWheel.01.18.15.jpg"), "HTML must reference the local flavor wheel image");
assert(html.includes("非官方翻譯"), "HTML must clearly mark the translation as unofficial");
assert(html.includes("私人學習"), "HTML must state private-learning use");
assert(html.includes("Creative Commons Attribution-NonCommercial-NoDerivatives 4.0"), "HTML must include the SCA license note");

console.log(`SCA flavor wheel guide check passed: ${flattened.length} visible nodes, ${labels.size} unique English labels.`);
