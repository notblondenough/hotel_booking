import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import * as apiClient from "../api_client";
import { useAppContext } from "../contexts/AppContext";
import { useMutation } from "react-query";

const AddHotel=()=>{
    const {showToastMessage} = useAppContext();
    const {mutate,isLoading} = useMutation(apiClient.addMyHotel,{
        onSuccess: () => {
            showToastMessage({message:'Hotel Saved!',type:'SUCCESS'});
        },
        onError: () => {
            showToastMessage({message:'Error saving hotel!',type:'ERROR'});
        }
    });
    
    const handleSave=(HotelFormData:FormData)=>{
        mutate(HotelFormData);
    }
    return (
        <ManageHotelForm onSave={handleSave} isLoading={isLoading}/>
    )
}
export default AddHotel;