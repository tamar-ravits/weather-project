export function _createActionTypes(types) {
    return types.reduce((previousValue, currentValue) => {
        previousValue[currentValue] = currentValue;
        return previousValue;
    }, {});
}

export function _createActionCreator(type) {
    return function (payload, meta) {
        const action = { type };

        if (typeof payload !== 'undefined') {
            action.payload = payload;
        }

        if (payload instanceof Error) {
            action.error = true;
        }

        if (typeof meta !== 'undefined') {
            action.meta = meta;
        }

        return action;
    };
}
export { _createActionTypes as createActionTypes };
export { _createActionCreator as createActionCreator };