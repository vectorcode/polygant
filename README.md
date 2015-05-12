> front_prj - это база для развёртывания frontend проекта. Включает в себя, Gulp, Sass, Jade, минификацию и конканинацию файлов, deploy на боевой сервер

Для запуска:

0. git clone https://github.com/kovaldn/front_prj my_prj
1. npm i
2. bower i
3. gulp - Задача по-умолчанию ['server', 'watch']
4. gulp build - Собираем папку DIST (только после компиляции Jade)
5. gulp minihtml - минификация html в папке dist
6. gulp deploy - загружаем на сервер содержимое папки dist


