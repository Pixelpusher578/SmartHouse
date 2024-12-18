export async function GetCategorys():Promise<any[]>{
    const response=await  fetch(`http://localhost:3001/product/getall`, {cache:'no-store'})
    if (!response.ok) {
        throw new Error('fetch failed');
    }

    const data= await response.json()

    return data.products

}

export async function UpdateCategory(cat,desc,id):Promise<any>{
    try {
        const response = await fetch(`http://localhost:3001/product/update/${id}`, {
            method: "POST",
            cache: "no-store",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                description: desc,
                category: cat,
            }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json(); // Parse JSON response
        console.log("Product updated successfully:", data);
    } catch (error) {
        console.error("Error updating product:", error.message);
        console.log(error.message)
    }
};
export async function DeleteCategory(id):Promise<any>{
    try {
        const response = await fetch(`http://localhost:3001/product/delete/${id}`, {
            method: "POST",
            cache: "no-store",
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json(); // Parse JSON response
        console.log("Product deleted successfully:", data);
    } catch (error) {
        console.error("Error deleing product:", error.message);
        console.log(error.message)
    }
};

export async function ADDCategory(cat,desc):Promise<any>{
    try {
        const response = await fetch(`http://localhost:3001/product/add`, {
            method: "POST",
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                description: desc,
                category: cat,
            }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Product Added successfully:", data);
    } catch (error) {
        console.error("Error updating product:", error.message);
        console.log(error.message)
    }
};

export async function ADDProduct(device):Promise<any>{
    try {
        const response = await fetch(`http://localhost:3001/product/addSubProd/673396583ba0025fbb896fac`, {
            method: "POST",
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(device),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Product Added successfully:", data);

        return data.subprod

    } catch (error) {
        console.error("Error updating product:", error.message);
        console.log(error.message)
    }
};
export async function GetAlldevices(params):Promise<any[]>{
    const response=await  fetch(`http://localhost:3001/product/getSubProd/${params}`, {cache:'no-store'})
    if (!response.ok) {
        throw new Error('fetch failed');
    }

    const data= await response.json()

    return data.subDevices

}
export async function GetAlldevicesModels(idcat,idprod):Promise<any[]>{
    const response=await  fetch(`http://localhost:3001/product/getSubProd/${idcat}/${idprod}`, {cache:'no-store'})
    if (!response.ok) {
        throw new Error('fetch failed');
    }

    const data= await response.json()

    return data.subDevices

}

export async function deleteProduct(idcat,id):Promise<any[]>{
    console.log("hahaha")
    console.log(idcat,id)
    const response=await  fetch(`http://localhost:3001/product/deleteSubProd/${idcat}/${id}`, {
        method: "POST",
        cache: "no-store",
        headers: {
            "Content-Type": "application/json",
        },
    })
    console
    if (!response.ok) {
        throw new Error('fetch failed');
    }

    const data= await response.json()

    return data.subDevices

}
export async function UpdateProduct(idcat,id,device):Promise<any[]>{
    const response=await  fetch(`http://localhost:3001/product/updateSubProd/${idcat}/${id}`, {
        method: "POST",
        cache: "no-store",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(device)
    })
    console
    if (!response.ok) {
        throw new Error('fetch failed');
    }

    const data= await response.json()

    return data.subProduct

}
export async function handelasyncparams(params):Promise<any[]>{
    const {id} = await params;


    return id

}
