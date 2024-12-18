import React, {useState} from 'react';
import DevicesAttribute from "@/utils-front/DevicesAttributes";
import {ADDProduct} from "@/utils-front/ProductsCalls";
import {Activity, Home, Lightbulb, Smartphone, Wifi} from "lucide-react";
import {FormError} from "@/components/form-error";
import SubCategory from "@/utils-front/Lists";
import {toast} from "sonner";

const categoryIcons = {
    "Home Appliances": <Home className="text-blue-500 w-6 h-6" />,
    Lighting: <Lightbulb className="text-yellow-500 w-6 h-6" />,
    Connectivity: <Wifi className="text-green-500 w-6 h-6" />,
    Sensors: <Activity className="text-red-500 w-6 h-6" />,
    "Smart Devices": <Smartphone className="text-purple-500 w-6 h-6" />,
};

interface AddProductFormProps {
    setlen:any;
    setspinner:any;
    list:any;
    setlist:any;
    setaddModel:any
}
const AddProductForm = ({setaddModel,setlist,setspinner,setlen,list}:AddProductFormProps) => {
    const [deviceName, setDeviceName] = useState("");
    const [deviceImage, setDeviceImage] = useState("");
    const [currentcategory, setCurrentcategory] = useState(0);

    const [deviceAttributesByCategory, setDeviceAttributesByCategory] = useState({});

    function AddToAttributeList(attr) {
        const currentCategory = DevicesAttribute[currentcategory].category;

        setDeviceAttributesByCategory((prev) => {
            const updatedCategoryAttributes = prev[currentCategory] || [];
            const isAlreadyChecked = updatedCategoryAttributes.includes(attr);

            // Toggle the attribute
            const newAttributes = isAlreadyChecked
                ? updatedCategoryAttributes.filter((item) => item !== attr) // Remove if already checked
                : [...updatedCategoryAttributes, attr]; // Add if not checked

            return {
                ...prev,
                [currentCategory]: newAttributes,
            };
        });
        console.log(deviceAttributesByCategory);
    }

    function isAttributeChecked(attr) {
        const currentCategory = DevicesAttribute[currentcategory].category;
        return deviceAttributesByCategory[currentCategory]?.includes(attr) || false;
    }

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setDeviceImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let settings = {}
        for (const category in deviceAttributesByCategory) {
            for (const attribute of deviceAttributesByCategory[category]) {
                if (category === "Sensors") {
                    settings[attribute] = "readOnly"

                } else {
                    settings[attribute] = "readWrite"
                }
            }

        }
        if (!deviceName || deviceName.trim() === "") {
             toast.error("Device name is required.");
            return
        }

         if (!deviceImage || deviceImage.trim() === "") {
             toast.error("Device image is required.");
            return

        }

        if (!settings || Object.keys(settings).length === 0) {
             toast.error("Settings are required.");
            return
        }






        let Device = {
             name: deviceName ,
             picture: deviceImage ,
            settings: settings
        };
        setaddModel(false)
        setspinner(true)
        setlen(list.length + 1)
        const previousProducts = [...list]

        try {
            const Dev=await ADDProduct(Device)
            setlist([...list, Dev]);
            console.log("Product added successfully");

        }catch (err){
            console.error("Error adding product:", err);
            setlist(previousProducts);
        }finally {
            setspinner(false);
        }


    };

    return (
        <form onSubmit={handleSubmit} className="space-y-7">
            <input
                type="text"
                placeholder="Device Name"
                value={deviceName}
                onChange={(e) => setDeviceName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg "
            />

            <input
                placeholder={"Device Image"}
                type="file"
                // onChange={handleImageUpload}
                onChange={handleImageUpload}

                className="w-full p-2 border border-gray-300 text-gray-700 py-3 rounded-lg"
            />
            <nav className="flex justify-center gap-6">
                {DevicesAttribute.map((category, index) => (
                    <button
                        type="button"
                        key={index}
                        onClick={() => setCurrentcategory(index)}
                        className={`flex flex-col items-center p-2 ${
                            currentcategory === index ? "bg-orange-100" : "hover:bg-gray-200"
                        } rounded-lg`}
                    >
                        <span>{categoryIcons[category.category]}</span>
                        <span className="text-xs text-gray-700">{category.category}</span>
                    </button>
                ))}
            </nav>
            <div className="grid grid-cols-2 gap-4 mt-4">
                {DevicesAttribute[currentcategory]?.commonAttributes.map((attr, idx) => (
                    <div
                        key={`${DevicesAttribute[currentcategory].category}-${attr}`}

                        className="flex items-center p-2 border border-gray-300 rounded-lg"
                    >
                        <input
                            id={`${DevicesAttribute[currentcategory].category}-${attr}`}
                            name={`${DevicesAttribute[currentcategory].category}-${attr}`}
                            type="checkbox"
                            checked={isAttributeChecked(attr)}
                            onChange={() => AddToAttributeList(attr)}
                            className="w-4 h-4 text-blue-500"
                        />
                        <label
                            htmlFor={`${DevicesAttribute[currentcategory].category}-${attr}`}
                            className="ml-2 text-sm text-gray-700"
                        >
                            {attr}
                        </label>
                    </div>
                ))}
            </div>


            <div className="flex justify-end gap-4 mt-6">

                <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                    Submit
                </button>
            </div>
        </form>

    );
};

export default AddProductForm;