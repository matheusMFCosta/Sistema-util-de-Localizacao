const initialState = {
  idGen: 0,
  counters: { }
}


export function listMethods(state = {
    wow: false,
}, action) {
    switch (action.type) {
        case "TESTE":
            {
            console.log("wow")
            return {
            wow: true,
            }
        }

        default:
            return state;
    }
}


