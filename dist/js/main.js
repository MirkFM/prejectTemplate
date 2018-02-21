$(document).ready(function () {
    "use strict";

    var placeholderSymbol = " ";

    Inputmask.extendDefaults({
        showMaskOnHover: false,
        onincomplete: function () {
            var $this = $(this),
                $parent = $this.parents(".s-card-form__field"),
                index = $parent.find(".s-card-form__input").index($this),
                size = $parent.find(".s-card-form__input").length;

            $this.addClass("incomplate");

            if (size > 1 && index === 0) {
                $parent.find(".s-card-form__field-info:first").addClass("error");
            } else {
                $parent.find(".s-card-form__field-info:last").addClass("error");
            }
        },
        oncomplete: function () {
            var $this = $(this),
                $parent = $this.parents(".s-card-form__field"),
                index = $parent.find(".s-card-form__input").index($this),
                size = $parent.find(".s-card-form__input").length;

            $(this).removeClass("incomplate");

            if (size > 1 && index === 0) {
                $parent.find(".s-card-form__field-info:first").removeClass("error");
            } else {
                $parent.find(".s-card-form__field-info:last").removeClass("error");
            }
        }
    });

    Inputmask.extendDefinitions({
        b: { validator: "[-a-zA-Zа-яА-Я ]" },
        c: { validator: "[-a-zA-Zа-яА-Я0-9.,\"' ]" },
        d: { validator: "[a-zA-Z ]" },
        p: { validator: "[+]" }
    });

    $("[name='cardNumber']").each(function () {
        $(this).inputmask("email", {
            mask: "9{4} 9{4} 9{4} 9{4,7}",
            placeholder: placeholderSymbol
        });
    });

    $("[name='cardNumber']").each(function () {
        $(this).on("input propertychange", function () {
            var paymentSystem, cardNumber;

            cardNumber = $(this)
                .val()
                .replace(/\s/gi, "");
            paymentSystem = paymentSystemDetector(cardNumber);

            if (paymentSystem) {
                $("#payment-system").html(paymentSystem);
            } else {
                $("#payment-system").html("");
            }
        });
    });

    $("[name='expDate']").each(function () {
        $(this).inputmask("date", {
            mask: "99 / 99",
            placeholder: placeholderSymbol
        });
    });

    $("[name='cvv']").each(function () {
        $(this).inputmask({
            mask: "9{3,4}",
            placeholder: placeholderSymbol
        });
    });

    $("[name='cardHolder']").each(function () {
        $(this).inputmask({
            mask: "d{1,50}",
            placeholder: placeholderSymbol
        });
    });

    $("[name='bankName']").each(function () {
        $(this).inputmask({
            mask: "c{1,50}",
            placeholder: placeholderSymbol
        });
    });

    $("[name='email']").each(function () {
        $(this).inputmask({
            alias: "email",
            placeholder: placeholderSymbol
        });
    });

    $("[name='postIndex']").each(function () {
        $(this).inputmask({
            mask: "9{5,6}",
            placeholder: placeholderSymbol
        });
    });

    $("[name='region']").each(function () {
        $(this).inputmask({
            mask: "b{1,50}",
            placeholder: placeholderSymbol
        });
    });

    $("[name='city']").each(function () {
        $(this).inputmask({
            mask: "b{1,50}",
            placeholder: placeholderSymbol
        });
    });

    $("[name='address']").each(function () {
        $(this).inputmask({
            mask: "c{1,50}",
            placeholder: placeholderSymbol
        });
    });

    $("[name='phone']").each(function () {
        $(this).inputmask({
            mask: "[p]9 999 999 99 99",
            placeholder: placeholderSymbol
        });
    });

    $("form").on("submit", function (e) {
        var error,
            form = this;

        $("input", form).each(function () {
            if ($(this).hasClass("incomplate")) {
                error = true;
            }
        });

        if (error) {
            e.preventDefault();

            return false;
        }
    });
});
