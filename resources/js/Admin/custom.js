'use strict'
import axios from 'axios';

document.addEventListener("DOMContentLoaded", function(event) {

    const refPopup = document.querySelector('#ref_popup');

    if (refPopup) {
        document.querySelector('.open_ref_pop').
            addEventListener('click', function(e) {
                e.preventDefault();
                refPopup.classList.add('open');
            });

        document.querySelector('.close_popup').addEventListener('click', function(e){
            e.preventDefault();
            refPopup.classList.remove('open');
        })
    }


    const banUserButtons = document.querySelectorAll('.ban_user');
    if(banUserButtons) {
        banUserButtons.forEach((button) => {
            //addEventListenerToBanButtons(button);
            button.addEventListener('click', banUserClick)
        })
    }

    const unbanUserButtons = document.querySelectorAll('.un_ban_user');
    if (unbanUserButtons) {
        unbanUserButtons.forEach((button) => {
            unbanUser(button);
        })
    }

    function postBanUser(element, banType) {

        const packets = {
            'banType' : banType
        }

        const userId = element.dataset.id;

        return axios.post('/admin/ban-user/' + userId, packets)
        .then(
            (response) => {
                const success = response.data.success;

                if (success) {
                    element.classList.remove('ban_user');
                    element.classList.remove('btn-danger');
                    element.classList.add('un_ban_user');
                    element.classList.add('btn-dark');
                    element.textContent = 'UnBan User';
                    banUserButtons.forEach((button) => {
                        if (button.classList.contains('user_' +  userId)) {
                            button.removeEventListener('click', banUserClick);
                        }
                    })
                    unbanUser(element);
                }

            })
        .catch(error => {
            if (error.response) {
                console.error("error.response: ", error.response);
            } else {
                console.error("ERROR:: ", error);
            }

        });
    }

    function addEventListenerToBanButtons(element) {
        element.addEventListener('click', banUserClick)

    }
    function unbanUser (element) {
        element.addEventListener('click', function(e) {
            e.preventDefault();

            return axios.post('/admin/unban-user/' + element.dataset.id)
            .then(
                (response) => {
                    const success = response.data.success;

                    if (success) {
                        element.classList.remove('un_ban_user');
                        element.classList.remove('btn-dark');
                        element.classList.add('ban_user');
                        element.classList.add('btn-danger');
                        element.textContent = 'Ban User';
                        addEventListenerToBanButtons(element);
                    }

                })
            .catch(error => {
                if (error.response) {
                    console.error("error.response: ", error.response);
                } else {
                    console.error("ERROR:: ", error);
                }

            });
        })
    }

    const submitBanButton = document.querySelector('#ban_user_button');
    if (submitBanButton) {
        submitBanButton.addEventListener('click', function(e) {
            const userId = e.target.dataset.id;
            const banType = document.querySelector('#ban_type').value;
            const element = document.querySelector('a.user_'+userId);
            postBanUser(element, banType);
        })
    }

    function banUserClick(evt) {
        document.querySelector('#ban_user_modal #ban_user_button').dataset.id = evt.currentTarget.dataset.id;
        $('#ban_user_modal').modal('show');
    }

    console.log("hellothere!");
});
