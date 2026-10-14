export default function validateRole({ role }){
    if((role != "Patient") && (role != "Doctor")){
        return {msg: 'Role must either be "Doctor" or "Patient"'};
    }else{
        return {msg: null};
    }
}