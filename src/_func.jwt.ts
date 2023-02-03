import axios from "axios";
import React from "react";
import _data from "./_data";

function LoadWorkItems_jwtfn(path: string, token: string): Promise<LoadWorkItems> {
    _data.jwtaxios.headers.Authorization = `Bearer ${token}`;
    return new Promise((resolve, reject) => {
        axios
            .get(`${_data.API}${path}`, _data.jwtaxios)
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

function loadWorkItem_jwtfn(path: string, token: string): Promise<LoadWorkItem> {
    _data.jwtaxios.headers.Authorization = `Bearer ${token}`;
    return new Promise((resolve, reject) => {
        axios
            .get(`${_data.API}${path}`, _data.jwtaxios)
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

function updateWorkItem_jwtfn(
    path: string,
    id: number,
    completed: boolean,
    title: string,
    token: string
): Promise<LoadWorkItem> {
    _data.jwtaxios.headers.Authorization = `Bearer ${token}`;
    return new Promise((resolve, reject) => {
        axios
            .put(
                `${_data.API}${path}`,
                {
                    id: id,
                    completed: completed,
                    title: title,
                },
                _data.jwtaxios
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

function deleteWorkItem_jwtfn(
    path: string,
    id: number,
    token: string
): Promise<LoadWorkItem> {
    _data.jwtaxios.headers.Authorization = `Bearer ${token}`;
    return new Promise((resolve, reject) => {
        axios
            .delete(`${_data.API}${path}/${id}`, _data.jwtaxios)
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

function addWorkItem_jwtfn(
    path: string,
    completed: boolean,
    title: string,
    token: string
): Promise<LoadWorkItem> {
    _data.jwtaxios.headers.Authorization = `Bearer ${token}`;
    return new Promise((resolve, reject) => {
        axios
            .post(
                `${_data.API}${path}`,
                {
                    completed: completed,
                    title: title,
                },
                _data.jwtaxios
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
    LoadWorkItems_jwtfn,
    loadWorkItem_jwtfn,
    updateWorkItem_jwtfn,
    addWorkItem_jwtfn,
    deleteWorkItem_jwtfn,
};
