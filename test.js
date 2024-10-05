


function getTime(time) {
    const hour =parseInt(time/3600);
    let reminder =(time%3600);
    const min = parseInt(reminder/60);

    return `${hour}hrs ${min} min ago`;
}
