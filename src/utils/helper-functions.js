import moment from "moment/moment";


const formatMenuArray = (menus) => {
    const flatArray = [];
    menus.forEach((element) => {
        flatArray.push(element);
        if (Array.isArray(element.child)) {
            flatArray.push(...formatMenuArray(element.child));
        }
    });
    return flatArray;
}

export const formatPermissions = (permissions) => {
    if (!permissions){
        return [];
    }
    return eval(permissions).map(str => parseInt(str, 10))
}

export const checkPermission = (menus, permission, path, page = false) => {
    let newMenus = formatMenuArray(menus);
    const activeMenu = newMenus.find(menu => menu.route === path);
    if (page){
        return activeMenu !== undefined;
    }
    if (activeMenu){
        const formattedPerms = formatPermissions(activeMenu.permission);
        console.log('FORMATTED PERMS', formattedPerms);
        return formattedPerms.includes(permission);
    }
    return false;
}

export const removeQuotes = (stringWithQuotes) => {
    if (!stringWithQuotes){
        return;
    }
    return stringWithQuotes.replace(/^"|"$/g, '');
}

export const splitString = (string, separator = ',') => {
    if (string){
        return string.trim().split(',').map(Number);
    }
}
export const getInitials = (name = '') => name
    ?.replace(/\s+/, ' ')
    .split(' ')
    .slice(0, 2)
    .map((v) => v && v[0].toUpperCase())
    .join('');

export const getAutoCompleteValue = (options, value, filterField = 'id') => {
    return Array.isArray(options) ? options.find(option => option[filterField] === value) ?? null : null;
};




export const formatDate = (date, format = 'DD MMM YYYY') => {
    if(date){
        return moment(date).format(format);
    }
    return null;
}

export const getBrowserDetails = () =>{
    return navigator.userAgent;
}

export const getIPAddress = async () => {
    const ipAddressURL = 'https://ipapi.co/json/';
    let ipAddress = "";
    await fetch(ipAddressURL)
        .then(response => response.json())
        .then(data => {
            ipAddress = data.ip;
        })
        .catch(error => {
            console.error("Error fetching IP address: " + error);
        });
    return ipAddress;
}



