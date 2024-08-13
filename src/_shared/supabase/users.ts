import { supabase } from "."

export const getUser = async (telegram_id: number) => {
    console.log(telegram_id, "telegram_id")
    const { data, error } = await supabase
    .from("user")
    .select("*")
    .eq("telegram_id", telegram_id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()
    console.log(data)
    if (error || !data) {
        throw new Error("User not exist")
    }
    return data
}