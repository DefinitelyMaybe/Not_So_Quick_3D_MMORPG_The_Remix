/** @param {number} p a number between (0, 1)*/
export function ltqnorm(p) {
	/*
    Parsed into javascript by https://github.com/DefinitelyMaybe

    Modified from the author's original perl code (original comments follow below)
    by dfield@yahoo-inc.com.  May 3, 2004.

    Lower tail quantile for standard normal distribution function.

    This function returns an approximation of the inverse cumulative
    standard normal distribution function.  I.e., given P, it returns
    an approximation to the X satisfying P = Pr{Z <= X} where Z is a
    random variable from the standard normal distribution.

    The algorithm uses a minimax approximation by rational functions
    and the result has a relative error whose absolute value is less
    than 1.15e-9.

    Author:      Peter John Acklam
    Time-stamp:  2000-07-19 18:26:14
    E-mail:      pjacklam@online.no
    WWW URL:     http://home.online.no/~pjacklam
    */

	if (p <= 0 || p >= 1) {
		// The original perl code exits here, we'll throw an exception instead
		throw Error(`Argument to ltqnorm ${p} must be in open interval (0,1)`);
	}

	// Coefficients in rational approximations.
	const a = [
		-3.969683028665376e1, 2.209460984245205e2, -2.759285104469687e2, 1.38357751867269e2,
		-3.066479806614716e1, 2.506628277459239
	];
	const b = [
		-5.447609879822406e1, 1.615858368580409e2, -1.556989798598866e2, 6.680131188771972e1,
		-1.328068155288572e1
	];
	const c = [
		-7.784894002430293e-3, -3.223964580411365e-1, -2.400758277161838, -2.549732539343734,
		4.374664141464968, 2.938163982698783
	];
	const d = [7.784695709041462e-3, 3.224671290700398e-1, 2.445134137142996, 3.754408661907416];

	// Define break-points.
	const plow = 0.02425;
	const phigh = 1 - plow;

	// Rational approximation for lower region:
	if (p < plow) {
		const q = Math.sqrt(-2 * Math.log(p));
		return (
			(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
			((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1)
		);
	}

	// Rational approximation for upper region:
	if (phigh < p) {
		const q = Math.sqrt(-2 * Math.log(1 - p));
		return (
			-(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
			((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1)
		);
	}

	// Rational approximation for central region:
	const q = p - 0.5;
	const r = q * q;
	return (
		((((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q) /
		(((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1)
	);
}
