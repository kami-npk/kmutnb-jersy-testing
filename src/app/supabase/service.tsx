import SupabaseService from './supabase'
import { Slip ,SlipforAdmin,CheckOrder} from "../type/slip";
export const uploadData = async(slip:Slip) =>{
    const supabase = SupabaseService.getClient();
    const {error} = await supabase
    .from('orders')
    .insert(slip)
    if(error){
        console.error(error)
        return null
    }
    return 'upload success'
}
export const uploadSlip = async(file:File) =>{
    const supabase = SupabaseService.getClient();
    const fileName = `${Date.now()}_${file.name}`;
    const {error} = await supabase
    .storage.from('slip')
    .upload(fileName,file)
    if(error){
        console.log(error);
    }
    const { data: urlData} = supabase
  .storage
  .from('slip')
  .getPublicUrl(fileName);

return urlData.publicUrl;
    
}

export const fetchDataAdmin = async ():Promise<SlipforAdmin[]> =>{
    const supabase = SupabaseService.getClient();
    const {data,error} = await supabase
    .from('orders-item')
    .select('*')
    if(error){
        console.log(error)
        return []
    }   
    return (data ??[]) as SlipforAdmin[]
    
}
export const fetchData = async(name:string):Promise<CheckOrder|null> =>{
    const supabase = SupabaseService.getClient();
    const {data,error} = await supabase
    .from('orders')
    .select('name,order_items,pickup_method,shipping_address,contact')
    .eq('name',name)
    .single()
    if(error){
        console.log(error)
        return null
    }
    return (data ??null) as CheckOrder
}
