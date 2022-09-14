class LastMinutePage {

    getMainTitle() {
        return cy.get('h1.main-title')
    }

    getResultsTable() {
        return cy.get('.grid-results__tiles')
    }

    getBookingRequestSection() {
        return cy.get('.booking-request-info')
    }

    getPlaceInfoSection() {
        return cy.get('.booking-interlocutor-info')
    }

    getOfferInfoSection() {
        return cy.get('.offer-info')
    }

    getRulesnfoSection() {
        return cy.get('.rules-info')
    }

    getPaymentsMethodsSection() {
        return cy.get('.payment-methods')
    }

    getPaymentInfoSection() {
        return cy.get('.booking-layout__aside')
    }

    clickBuyNowBtn() {
        cy.get('.sticky-box > .w-100').click()
    }

    getLoginPopupWindow() {
        return cy.get('#login-modal___BV_modal_content_')
    }

}

export default LastMinutePage;