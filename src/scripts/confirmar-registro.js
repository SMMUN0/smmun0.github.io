// Eliminar cookies
document.cookie.split(';').forEach(cookie_untrimmed => {
    let cookie = cookie_untrimmed.trim();
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
});
