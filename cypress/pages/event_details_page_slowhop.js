const bookingRequestSection = '.booking-request-info';
const aboutPlaceSection  = '.booking-interlocutor-info';
const offerInfoSection = '.offer-info';
const rulesInfoSection = '.rules-info';
const paymentsMethodsSection = '.payment-methods';
const paymentsInfoSection = '.booking-layout__aside';
const buyNowBtn = '.sticky-box > .w-100';
const loginPopupWindow = '#login-modal___BV_modal_content_';
const priceContainerDescriptionTitle = '.price-container__description h2';
const goToPaymentBtn = '.sticky-box button';
const loginBtn = '.btn--orange.w-100';
const loginWithFacebookBtn = '.btn-facebook';

export class EventDetailsPage {

    getBookingRequestSection() {
        return cy.get(bookingRequestSection);
    }

    getPlaceInfoSection() {
        return cy.get(aboutPlaceSection);
    }

    getOfferInfoSection() {
        return cy.get(offerInfoSection);
    }

    getRulesInfoSection() {
        return cy.get(rulesInfoSection);
    }

    getPaymentsMethodsSection() {
        return cy.get(paymentsMethodsSection);
    }

    getPaymentInfoSection() {
        return cy.get(paymentsInfoSection);
    }

    clickBuyNowBtn() {
        cy.get(buyNowBtn).click();
    }

    getLoginPopupWindow() {
        return cy.get(loginPopupWindow);
    }

    validateAboutPlaceSectionTitle() {
        cy.get(aboutPlaceSection)
                .find('h1')
                .should('have.text', 'About place');
    }

    validateTotalPriceText() {
        cy.get(offerInfoSection)
                .find(priceContainerDescriptionTitle)
                .should('contain.text', 'Total price for the stay');
    }

    validateTermsCancellationText() {
        cy.get(rulesInfoSection)
                .find('h1')
                .should('have.text', 'Terms and cancellation rules');
    }

    validatePaymentMethodsTitle() {
        cy.get(paymentsMethodsSection)
                .find('h1')
                .should('have.text', 'Payment methods');
    }

    validateGoToPaymentText() {
        cy.get(paymentsInfoSection)
                .find(goToPaymentBtn)
                .should('contain', 'Go to payment');
    }

    clickGoToPaymentBtn() {
        cy.get(goToPaymentBtn).click();
    }

    loginBtn() {
        return loginBtn;
    }

    loginWithFacebookBtn() {
        return loginWithFacebookBtn;
    }
}