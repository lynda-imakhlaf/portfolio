@echo off
echo.
echo 🚀 IMAKTECK 3D Portfolio - Migration vers architecture modulaire
echo ==============================================================
echo.

REM Vérifier qu'on est dans le bon dossier
if not exist "package.json" (
    echo ❌ Erreur: Execute ce script depuis la racine de ton projet React
    pause
    exit /b 1
)

echo 📁 Etape 1: Creation de la structure de dossiers...

REM Créer tous les dossiers nécessaires
mkdir "src\components\layout" 2>nul
mkdir "src\components\sections" 2>nul
mkdir "src\components\models" 2>nul
mkdir "src\components\3d" 2>nul
mkdir "src\styles\components" 2>nul
mkdir "src\hooks" 2>nul

echo ✅ Structure de dossiers creee

echo 📄 Etape 2: Creation des fichiers de composants...

REM Créer tous les fichiers nécessaires (équivalent touch sur Windows)
echo. > "src\components\layout\Header.jsx"
echo. > "src\components\layout\Footer.jsx"

echo. > "src\components\sections\Hero.jsx"
echo. > "src\components\sections\Stats.jsx"
echo. > "src\components\sections\About.jsx"
echo. > "src\components\sections\Contact.jsx"
echo. > "src\components\sections\ModelsSection.jsx"

echo. > "src\components\models\ModelCard.jsx"

echo. > "src\components\3d\Model3D.jsx"
echo. > "src\components\3d\Background3D.jsx"
echo. > "src\components\3d\SimpleModelViewer.jsx"

echo. > "src\hooks\useScrollToSection.js"

echo. > "src\styles\globals.css"
echo. > "src\styles\components\models.css"

echo ✅ Fichiers crees

echo 📋 Etape 3: Creation de la liste des taches...

REM Créer un fichier TODO avec les étapes restantes
(
echo # 📋 TODO - Migration IMAKTECK 3D
echo.
echo ## ✅ Termine
echo - [x] Structure de dossiers creee
echo - [x] Fichiers de composants crees
echo.
echo ## 🔄 A faire maintenant
echo.
echo ### 1. Copier le contenu des composants
echo Copie le contenu de chaque composant depuis les artifacts Claude vers les fichiers :
echo.
echo - [ ] `src/components/layout/Header.jsx`
echo - [ ] `src/components/layout/Footer.jsx`
echo - [ ] `src/components/sections/Hero.jsx`
echo - [ ] `src/components/sections/Stats.jsx`
echo - [ ] `src/components/sections/About.jsx`
echo - [ ] `src/components/sections/Contact.jsx`
echo - [ ] `src/components/sections/ModelsSection.jsx`
echo - [ ] `src/components/models/ModelCard.jsx`
echo - [ ] `src/components/3d/Model3D.jsx`
echo - [ ] `src/components/3d/Background3D.jsx`
echo - [ ] `src/components/3d/SimpleModelViewer.jsx`
echo - [ ] `src/hooks/useScrollToSection.js`
echo - [ ] `src/styles/globals.css`
echo - [ ] `src/styles/components/models.css`
echo.
echo ### 2. Remplacer App.jsx
echo - [ ] Remplacer le contenu de `src/App.jsx` par la version refactorisee
echo.
echo ### 3. Tester
echo - [ ] `npm run dev` pour verifier que tout fonctionne
echo - [ ] Corriger les erreurs d'import si necessaire
echo.
echo ### 4. Commit
echo - [ ] `git add .`
echo - [ ] `git commit -m "🏗️ Refactor: Architecture modulaire"`
echo - [ ] `git push`
echo.
echo ## 🆘 En cas de probleme
echo 1. Verifier les imports/exports
echo 2. S'assurer que les chemins sont corrects
echo 3. Consulter la console du navigateur pour les erreurs
echo.
echo ## 📞 Support
echo Si tu rencontres des difficultes, demande de l'aide a Claude !
) > "MIGRATION_TODO.md"

echo 📝 Fichier MIGRATION_TODO.md cree avec les etapes restantes
echo.
echo 🎉 STRUCTURE CREEE AVEC SUCCES !
echo ================================
echo.
echo 📋 Prochaines etapes :
echo 1. Consulte le fichier MIGRATION_TODO.md pour les details
echo 2. Copie le contenu des composants depuis les artifacts Claude
echo 3. Teste avec: npm run dev
echo 4. Commit tes changements
echo.
echo 💡 Astuce: Commence par un composant simple comme Header.jsx
echo 🚀 Bonne migration !
echo.
pause