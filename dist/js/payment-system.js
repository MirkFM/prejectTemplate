var paymentSystemList = {
    amex: [
        {
            start: 340000,
            end: 349999
        },
        {
            start: 370000,
            end: 379999
        }
    ],
    dinersclub: [
        {
            start: 300000,
            end: 305999
        },
        {
            start: 309500,
            end: 309599
        },
        {
            start: 360000,
            end: 369999
        },
        {
            start: 380000,
            end: 399999
        }
    ],
    discover: [
        {
            start: 601100,
            end: 601109
        },
        {
            start: 601120,
            end: 601149
        },
        {
            start: 601174,
            end: 601174
        },
        {
            start: 601177,
            end: 601179
        },
        {
            start: 601186,
            end: 601199
        },
        {
            start: 644000,
            end: 659999
        }
    ],
    jcb: [
        {
            start: 352800,
            end: 358999
        }
    ],
    maestro: [
        {
            start: 500000,
            end: 509999
        },
        {
            start: 560000,
            end: 601099
        },
        {
            start: 601200,
            end: 622125
        },
        {
            start: 622999,
            end: 623999
        },
        {
            start: 627000,
            end: 628199
        },
        {
            start: 628900,
            end: 643999
        },
        {
            start: 660000,
            end: 699999
        }
    ],
    mastercard: [
        {
            start: 510000,
            end: 559999
        },
        {
            start: 222100,
            end: 272099
        }
    ],
    mir: [
        {
            start: 220000,
            end: 220499
        }
    ],
    unionpay: [
        {
            start: 622126,
            end: 622998
        },
        {
            start: 624000,
            end: 626999
        },
        {
            start: 628200,
            end: 628899
        }
    ],
    visa: [
        {
            start: 400000,
            end: 499999
        }
    ]
};

function paymentSystemDetector(cardNumber) {
    var binEnd, binStart, cardNumberLength, paymentSystem;

    if (typeof cardNumber !== "string") {
        return undefined;
    }

    cardNumberLength = cardNumber.length;

    if (cardNumberLength > 0 && cardNumberLength < 6) {
        // binStart = Number(`${cardNumber}00000`.slice(0, 6));
        // binEnd = Number(`${cardNumber}99999`.slice(0, 6));

        paymentSystem = findPaymentSystemFromBin(binStart, binEnd);
    } else if (cardNumberLength >= 6) {
        binStart = Number(cardNumber.substr(0, 6));

        paymentSystem = findPaymentSystemFromBin(binStart, binStart);
    } else {
        paymentSystem = undefined;
    }

    return paymentSystem;
}

function findPaymentSystemFromBin(binStart, binEnd) {
    let i, paymentSystem, range, size;

    for (paymentSystem in paymentSystemList) {
        if (
            Object.prototype.hasOwnProperty.call(
                paymentSystemList,
                paymentSystem
            )
        ) {
            for (
                i = 0, size = paymentSystemList[paymentSystem].length;
                i < size;
                i++
            ) {
                range = paymentSystemList[paymentSystem][i];

                if (range.start <= binStart && binEnd <= range.end) {
                    return paymentSystem;
                }
            }
        }
    }

    return undefined;
}
