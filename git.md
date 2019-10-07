# GIT
Software de control de versiones.[aquí](https://git-scm.com/book/es/v1/Empezando)

## Configuración global de git
```
git config --global user.name "Fernando Castillo Torrico"
git config --global user.email "fernandocto.scz@gmail.com"
```

## Push a una carpeta existente

```bash
cd [nombre-carpeta]

#Crear localmente un repositorio git
git init

#Agregar el enlace del git remoto
git remote add origin https://gitlab.dev.migapp.site/cps-fisico/informatica-ui.git

#Agrega al repositorio los archivos que indiquemos
git add .

#Crea un commit con el mensaje "Initial commit"
git commit -m "Initial commit"

#Sube los archivos al repositorio remoto
git push -u origin master
```

## Comandos básicos de git

```bash
# Muestra una lista con los comandos más utilizados en GIT.
git help

# Lista las ramas de un proyecto git
git branch

# Indica el estado del repositorio de git
git status

# Lista los log del repositorio. (--oneline: muestra los log en una sola linea)
git log --oneline

# Actualizar el repositorio local.
git pull origin master
# origin: Repositorio
# master: Rama del repositorio

# Clonar repositorio git
git clone https://gitlab.dev.migapp.site/cps-fisico/informatica-ui.git
```

**Referencias**

* [http://www.7sabores.com/blog/git-comandos-basicos](http://www.7sabores.com/blog/git-comandos-basicos)
* [https://www.hostinger.es/tutoriales/comandos-de-git](https://www.hostinger.es/tutoriales/comandos-de-git)
* [https://www.diegocmartin.com/tutorial-git/](https://www.diegocmartin.com/tutorial-git/)