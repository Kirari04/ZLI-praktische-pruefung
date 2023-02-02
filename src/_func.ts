import axios from "axios";
import React from "react";
import _data from "./_data";

function LoadWorkItems_fn(path: string): Promise<LoadWorkItems> {
    return new Promise((resolve, reject) => {
        axios
            .get(`${_data.API}${path}`, _data.axios)
            .then((data) => {
                resolve({
                    success: true,
                    data: data.data,
                    error: null,
                });
            })
            .catch((err) => {
                resolve({
                    success: false,
                    data: [],
                    error: err.message,
                });
            });
    });
}

function loadWorkItem_fn(path: string): Promise<LoadWorkItem> {
    return new Promise((resolve, reject) => {
        axios
            .get(`${_data.API}${path}`, _data.axios)
            .then((data) => {
                resolve({
                    success: true,
                    data: data.data,
                    error: null,
                });
            })
            .catch((err) => {
                resolve({
                    success: false,
                    data: null,
                    error: err.message,
                });
            });
    });
}
function updateWorkItem_fn(
    path: string,
    id: number,
    completed: boolean,
    title: string
): Promise<LoadWorkItem> {
    return new Promise((resolve, reject) => {
        axios
            .put(
                `${_data.API}${path}`,
                {
                    id: id,
                    completed: completed,
                    title: title,
                },
                _data.axios
            )
            .then((data) => {
                resolve({
                    success: true,
                    data: {
                        id: id,
                        completed: completed,
                        title: title,
                    },
                    error: null,
                });
            })
            .catch((err) => {
                resolve({
                    success: false,
                    data: null,
                    error: err.message,
                });
            });
    });
}

function deleteWorkItem_fn(path: string, id: number): Promise<LoadWorkItem> {
    return new Promise((resolve, reject) => {
        axios
            .delete(`${_data.API}${path}/${id}`, _data.axios)
            .then((data) => {
                resolve({
                    success: true,
                    data: null,
                    error: null,
                });
            })
            .catch((err) => {
                resolve({
                    success: false,
                    data: null,
                    error: err.message,
                });
            });
    });
}

function addWorkItem_fn(
    path: string,
    completed: boolean,
    title: string
): Promise<LoadWorkItem> {
    return new Promise((resolve, reject) => {
        axios
            .post(
                `${_data.API}${path}`,
                {
                    completed: completed,
                    title: title,
                },
                _data.axios
            )
            .then((data) => {
                resolve({
                    success: true,
                    data: {
                        id: data.data.id,
                        completed: data.data.completed,
                        title: data.data.title,
                    },
                    error: null,
                });
            })
            .catch((err) => {
                resolve({
                    success: false,
                    data: null,
                    error: err.message,
                });
            });
    });
}

export {
    LoadWorkItems_fn,
    loadWorkItem_fn,
    updateWorkItem_fn,
    addWorkItem_fn,
    deleteWorkItem_fn,
};
