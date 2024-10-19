const Cookies = {
    setCookie: (name, value, days) => {
        let expires = '';
        if(days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));

            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" +(value || "") + expires + "; path=/";
    },
    getCookie: (name) => {
        const cookiesArray = document.cookie.split(';');

        let res = null;
        cookiesArray.forEach(cookie => {
            if((cookie.startsWith(" " + name + "=") || cookie.startsWith(name + "="))) {res = cookie;}
        });

        return res;
    },
    deleteCookie: (name) => {
        document.cookie = name + '=; max-age=0; path=/';
    },
};


export default Cookies;
