export const reducer = (state,action)=>{
    switch(action.type){
        case 'FETCH_REQUEST':return{
                ...state,
                loading:true
         };
        case 'FETCH_SUCCESS':return{
                ...state,
                products:action.payload,
                loading:false
        }
        case 'FETCH_FAIL':return{
                ...state,
                loading:false,
                isError:action.payload
        }
        default:return state;
    }
}