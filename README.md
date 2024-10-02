#  Pokedex

![](https://github.com/MirkoRinke/Developer-Akademie-pokedex/blob/main/preview.jpg)


### 📋 Overview

Welcome to my eighth project as part of the Developer Academy! In this project, I created a Pokédex website based on the PokeAPI. Here, you can browse various Pokémon, discover their characteristics, and view information about each Pokémon.

## 🔗 Links

- [Live Site URL](https://papaya-mandazi-4e17d6.netlify.app/)

## Function Overview

1. **⏳ Loading Screen**  
   A loading screen is displayed until the Pokémon cards are fully loaded.

2. **🖥️ Pokémon Display**  
   - Ten Pokémon are displayed per page.  
   - Navigation through left and right arrows:  
     - **➡️ Right:** Shows the next Pokémon (e.g., 11-20).  
     - **⬅️ Left:** Shows previous Pokémon (e.g., Pokémon 151, if only the Kanto region is loaded).

3. **🖼️ Pokémon Cards**  
   - Clicking on a Pokémon card opens an enlarged view with more information.  
   - Navigation in the enlarged view:  
     - **➡️ Right:** Next Pokémon card (e.g., 2).  
     - **⬅️ Left:** Previous Pokémon card (e.g., Pokémon 151).  
   - Clicking in the empty area next to the card closes the enlarged view.

4. **🔤 Language Support**  
   Support for the following languages:  
   - 🇩🇪 German  
   - 🇺🇸 English  
   - 🇯🇵 Japanese  
   - **🔄 Scope of Language Change:**  
     When switching languages, all elements on the page change, not just the texts on the Pokémon cards.

5. **🌍 Region Management**  
   A menu button to load additional regions.  
   - Starts displaying from the Pokémon of the selected region with the option for backward navigation.

6. **👤 Personalization**  
   An input field in the menu for entering the username.  
   - Assignment of a Pokémon based on the number of loaded regions (always the same Pokémon).

7. **⌨️ Keyboard Navigation**  
   The entire page is 100% navigable with the keyboard to ensure accessible use.  
   - **Navigation:**  
     - Use the **Tab key** to cycle through the elements on the page.  
     - Press **Enter** to open an element.  
     - Press **Esc** to close an open element.  
     - Use the **arrow keys** left and right to navigate through the Pokémon cards:  
       - This applies to both the 10-card view and the enlarged view with a single card.

8. **📜 Custom Database for Incomplete Data**  
   A custom "database" is used for Pokémon with incomplete data to supplement the missing information.  
   - **📃 Rules:**  
     - These additions occur only when there is no original text.  
     - The original text is used for flavor text and genera text if it is available.

9. **🔍 Search Suggestions**  
   When typing in the search field, suggestions are made based on the input and the available Pokémon to facilitate the search.


## 🛠️ Built with

- HTML
- CSS / SCSS
- JS

## ⚙️ How to Use

1. Clone the repository:
   ```bash
   git clone https://github.com/MirkoRinke/Developer-Akademie-pokedex.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Developer-Akademie-pokedex
   ```

## ✍️ Author

 - [Webiste](https://mirkorinke.dev)
 - [Github](https://github.com/MirkoRinke)
