/*
  Pragmatic JavaScript
  Chapter 1
  Programming Assignment: Closures

  Author: Ammar Ahmed
  Date: October 28, 2026
  Filename: script.js
*/

"use strict";

/**
 * Creates a character using a closure.
 * The three parameters remain private within this function's lexical scope.
 * Other code can read them only through the returned member functions.
 */
function createCharacter(name, gender, characterClass) {
  return {
    getName: function () {
      return name;
    },
    getGender: function () {
      return gender;
    },
    getClass: function () {
      return characterClass;
    }
  };
}

// Form and output elements from the starter HTML.
const characterForm = document.getElementById("characterForm");
const nameInput = document.getElementById("heroName");
const genderSelect = document.getElementById("heroGender");
const classSelect = document.getElementById("heroClass");
const characterOutput = document.getElementById("characterOutput");

// The class descriptions are presentation details, not properties on the character.
const classDetails = {
  warrior: { symbol: "⚔", description: "A steadfast champion who meets every challenge head-on." },
  mage: { symbol: "✦", description: "A scholar of arcane mysteries and untamed magic." },
  rogue: { symbol: "◆", description: "A quick-witted wanderer who thrives in the shadows." }
};

// Clear whitespace-validation errors as soon as the user changes the name.
nameInput.addEventListener("input", function () {
  nameInput.setCustomValidity("");
});

// Listen for form submission so both button clicks and pressing Enter work.
characterForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = nameInput.value.trim();
  const gender = genderSelect.value;
  const characterClass = classSelect.value;

  if (!name) {
    nameInput.setCustomValidity("Enter a character name to continue.");
    nameInput.reportValidity();
    return;
  }

  // These values come from the form; the function preserves them in a closure.
  const hero = createCharacter(name, gender, characterClass);

  // Read the private details through getter methods, never direct properties.
  displayCharacter(hero);
});

/** Displays a safely generated character card on the page. */
function displayCharacter(hero) {
  const characterClass = hero.getClass();
  const classDetail = classDetails[characterClass];
  const card = document.createElement("div");
  card.className = "hero-card";

  const avatar = document.createElement("div");
  avatar.className = "avatar avatar-" + characterClass;
  avatar.setAttribute("aria-hidden", "true");
  const avatarSymbol = document.createElement("span");
  avatarSymbol.textContent = classDetail.symbol;
  avatar.appendChild(avatarSymbol);

  const title = document.createElement("p");
  title.className = "hero-label";
  title.textContent = "YOUR HERO HAS ARRIVED";

  const heroName = document.createElement("h3");
  heroName.className = "hero-name";
  heroName.textContent = hero.getName();

  const heroSubtitle = document.createElement("p");
  heroSubtitle.className = "hero-description";
  heroSubtitle.textContent = classDetail.description;

  const stats = document.createElement("dl");
  stats.className = "hero-stats";
  addDetail(stats, "Name", hero.getName());
  addDetail(stats, "Gender", capitalize(hero.getGender()));
  addDetail(stats, "Class", capitalize(hero.getClass()));

  const confirmation = document.createElement("p");
  confirmation.className = "hero-confirmation";
  confirmation.textContent = "Character created successfully";

  card.append(avatar, title, heroName, heroSubtitle, stats, confirmation);
  // Using textContent instead of HTML string insertion keeps names safe to display.
  characterOutput.replaceChildren(card);
}

function addDetail(list, label, value) {
  const row = document.createElement("div");
  row.className = "stat-row";
  const key = document.createElement("dt");
  key.textContent = label;
  const data = document.createElement("dd");
  data.textContent = value;
  row.append(key, data);
  list.appendChild(row);
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
