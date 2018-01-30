/*<script type="text/javascript">*/
const _ID = 675;

var name_profile, soname_profile, email_profile, phone_profile, avatar_profile, client, modules_profile;
var API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijk5ZDhmMTc5Yjk2NjU5MzZlZjk0MGFhY2Q0ZDg1OTdiZmFiYmUxZDhlZDQyMjAwNjJkYjRiYjg4NDRjODFkN2FjNzg4M2Q2NjI5ZDJiZWI1In0.eyJhdWQiOiIxMCIsImp0aSI6Ijk5ZDhmMTc5Yjk2NjU5MzZlZjk0MGFhY2Q0ZDg1OTdiZmFiYmUxZDhlZDQyMjAwNjJkYjRiYjg4NDRjODFkN2FjNzg4M2Q2NjI5ZDJiZWI1IiwiaWF0IjoxNTE3MzMxNDk2LCJuYmYiOjE1MTczMzE0OTYsImV4cCI6MTgzMjg2NDI5Niwic3ViIjoiNzg4Iiwic2NvcGVzIjpbInVzZXJCYXNlSW5mbyIsInVzZXJEZXRhaWxlZEluZm8iLCJ1c2VyQ291cnNlSW5mbyJdfQ.ouod3O4rMb55aqzh8xqadgSz8Sw1yutQgLr8doQiEBNaGLA-lA5N7nAMBMw1I1bHZoCz843KndFay6oUSBm4e15BsODHfL3SN9iuqZ9nQq05T_1zdqMSVA7pS5PkItijsGzMXZVc27M-PLyGS1HkSZO6ND-F4nMQ1tIVgqgRUYjYlZt4i97_AKzf9xVaKjybkaWrqz-aKf4rd9LmDoADdGbFICjOEfMy0-837AwZgbXTkT1OTARrdmCop5bMBL00M2Ngc70PizILKtRQ2wU1Qgv028qMXcX-adDzEPgc4hlyVwSrzdj9fGAPu37a6uJpUEPyrQUNxf7wf7XhjR7Tv_NwqkBpPzvdM8QBhl8Fqfh0xTnzz5qhSyIdoCce8qnb-SF1yLsQhVmlN48vHZlLTwObbXWNyN-lIH4gGRLqXuUG1zHSmyKKDQ2bWk3FXojC_lyN_txis7ffcsPiqpGo1Nm34OA7aQNigF6QnMETZqSKUcAhDslFGMG3wbQr2Fiqt2bOEQdtaEsoP_T5ttaYcNcgbn3N9dr9xeWrZSpSyYidskc7J_y4ubMovr2D-z_OAhHm_miwVWovLgXSwvhrI-7MZgCn5t9yODeG7Oe1TJp2a1-mKc5xonosc-tuSf7rZ5NsizbnsiW6Wf1PG4c32Nh5362n8gYWGEC6GhmZmIg';
client = new INTITAClient({key: API_KEY});
client.getUserDetails(_ID, function (error, data) {
    //console.log(error, data)
    name_profile = document.getElementById("name_profile");
    name_profile.innerHTML = data.firstName;
    soname_profile = document.getElementById("soname_profile");
    soname_profile.innerHTML = data.secondName;
    email_profile = document.getElementById("email_profile");
    email_profile.innerHTML = data.email;
    phone_profile = document.getElementById("phone_profile");
    phone_profile.innerHTML = data.phone;
    avatar_profile = document.getElementById("avatar_profile");
    avatar_profile.src = data.avatar;
});
client.getUserCoursesAndModules(_ID, function (error, data) {
    var mainCourse = data.courses[0].id;

    client.getCourseInfo(mainCourse, function (error, data) {
        //console.log(error, data);
        modules_profile = document.getElementById("modules_profile");
        modules_profile.innerHTML = data.title_ua;

    });
    client.getCourseModules(mainCourse, function (error, modules) {
        modules.forEach(function (module) {
            //console.log(module.title);
            var course = document.getElementById("submenu");
            var tagLi = document.createElement("li");
            tagLi.innerHTML = module.title;
            tagLi.className = 'class_modeles';
            course.appendChild(tagLi);

            var Lect_ul = document.createElement("ul");
            Lect_ul.id = module.id;
            Lect_ul.className = "lectures";
            tagLi.appendChild(Lect_ul);

            client.getModuleLectures(module.id, function (error, lectures) {
                lectures.forEach(function (lecture) {
                    //console.log(lecture.title);
                    var Lect_li = document.createElement("li");
                    Lect_li.id = lecture.id;
                    Lect_li.innerHTML = lecture.title;
                    Lect_li.className = 'class_lectures';
                    Lect_ul.appendChild(Lect_li);
                });
            });
        })
    })
});
var modules = document.getElementsByClassName('class_modeles');
var title = document.getElementsByClassName('lectures');
for (var i = 0; i < modules.length; i++){
    modules[i].addEventListener('click',function () {
        if(!(this.classList.contains('active'))){
            for(var i = 0; i < title.length; i++){
                title[i].classList.remove('active');
            }
            this.title.add('active');
        }
    })
}
/*</script>*/
