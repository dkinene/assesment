import http from '../services/http';

const fetchData = (query, variables = null) => {
    return http({
        method: 'POST',
        data: {
            query,
            variables,
        },
    });
};

const capitalize = (string) => {
    return `${string.substring(0, 1).toUpperCase()}${string
        .substring(1)
        .toLowerCase()}`;
};

export { fetchData, capitalize };
