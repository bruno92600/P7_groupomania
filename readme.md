Voici mon projet pour le reseau social d'entreprise groupomania

##
--cloner ce repos sur votre ordinateur

## Pour la partie backend
--allez sur le backend : cd backend ;
--puis creer un fichier .env a la racine du backend, et entrez vos valeurs, en voici un exemple : 

token = exampleToken

db_host = exampleHost / localhost

db_user = exampleUser / root

db_password = examplePassword

db_database = exampleDatabase

cookieSecret = exampleCookie

--ensuite installer les dependances sur le terminal en faisant : npm i ;
--lancer ensuite le server sur avec : nodemon server ou npm start;
-- http://localhost:4200

## Pour la partie frontend
--allez sur le frontend : cd frontend ;
--puis creer un fichier .env a la racine du frontend, et entrez ceci dedans : SKIP_PREFLIGHT_CHECK=true ; (pour éviter des erreur)
--ensuite installer les dependances sur le terminal en faisant : npm i ;
----lancer ensuite le server avec : npm start ;
--un navigateur s'ouvre automatiquement sinon ouvrez un navigateur et entrez : http://localhost:3000
