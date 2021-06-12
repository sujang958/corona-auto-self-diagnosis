const diagnosis = require("./src/diagnosis");

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