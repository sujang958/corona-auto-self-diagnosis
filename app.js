const diagnosis = require("./src");

(async () => {
    await diagnosis({
        name: '', 
        birthday: '', 
        school: '', 
        class: '', 
        pw: '', 
        city: '',
    })
})();