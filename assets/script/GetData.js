const getData = async () => {
    // get data from json file
    const res = await fetch("assets/data/data.json");

    // convert fetched data to object/array
    const data = await res.json();

    // store fetched data from json file to local storage
    localStorage.setItem("products", JSON.stringify(data));

    return JSON.parse(localStorage.getItem("products"));
}
export default getData