import fs from "node:fs";
import vm from "node:vm";

const requiredFiles = [
  "index.html",
  "about.html",
  "sources.html",
  "privacy.html",
  "disclaimer.html",
  "contact.html",
  "robots.txt",
  "sitemap.xml",
  "assets/site.css",
  "questions/normal.html",
  "questions/pro.html",
  "questions/renew.html",
  "questions/normal-bank.html",
  "questions/pro-bank.html",
  "questions/normal-renew-bank.html",
  "questions/pro-renew-bank.html",
];

const banks = [
  ["data_normal.js", "dataNormal"],
  ["data_pro.js", "dataPro"],
  ["data_normal_renew.js", "dataNormalRenew"],
  ["data_pro_renew.js", "dataProRenew"],
];

const optionKeys = ["a", "b", "c", "d"];
let failures = 0;

function fail(message) {
  console.error(message);
  failures += 1;
}

for (const file of requiredFiles) {
  if (!fs.existsSync(file)) {
    fail(`missing required file: ${file}`);
  }
}

function loadBank(file, constName) {
  const source = fs.readFileSync(file, "utf8");
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(`${source}\nthis.__bank = ${constName};`, sandbox, {
    filename: file,
    timeout: 5000,
  });
  return sandbox.__bank;
}

for (const [file, constName] of banks) {
  const bank = loadBank(file, constName);
  if (!bank || typeof bank !== "object") {
    fail(`${file}: bank object not found`);
    continue;
  }

  if (!bank.version) {
    fail(`${file}: missing version`);
  }

  if (!bank.sectionTitle || typeof bank.sectionTitle !== "object") {
    fail(`${file}: missing sectionTitle`);
  }

  const questions = bank.data ? Object.entries(bank.data) : [];
  if (questions.length === 0) {
    fail(`${file}: no questions found`);
    continue;
  }

  for (const [id, question] of questions) {
    if (!Number.isInteger(question.number)) {
      fail(`${file}: ${id} missing numeric number`);
    }
    if (!Number.isInteger(question.section)) {
      fail(`${file}: ${id} missing numeric section`);
    }
    if (!question.description || typeof question.description !== "string") {
      fail(`${file}: ${id} missing description`);
    }
    for (const key of optionKeys) {
      if (!question.options?.[key] || typeof question.options[key] !== "string") {
        fail(`${file}: ${id} missing option ${key}`);
      }
    }
    if (!optionKeys.includes(question.answer)) {
      fail(`${file}: ${id} invalid answer ${question.answer}`);
    }
  }

  console.log(`${file}: validated ${questions.length} questions`);
}

const sitemap = fs.readFileSync("sitemap.xml", "utf8");
for (const page of ["https://uav-test.tw/", "https://uav-test.tw/about.html", "https://uav-test.tw/sources.html"]) {
  if (!sitemap.includes(page)) {
    fail(`sitemap missing ${page}`);
  }
}

for (const file of ["index.html", "about.html", "sources.html", "privacy.html", "contact.html"]) {
  const html = fs.readFileSync(file, "utf8");
  if (!html.includes('rel="canonical"')) {
    fail(`${file}: missing canonical link`);
  }
  if (!html.includes("全國無人機測驗中心")) {
    fail(`${file}: missing site brand text`);
  }
}

if (failures > 0) {
  console.error(`Validation failed with ${failures} issue(s)`);
  process.exit(1);
}

console.log("Static site validation passed");
