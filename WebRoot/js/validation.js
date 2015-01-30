(function (window, document, $, undefined)
{

    window.Validation = {
        form: [],
        messages: null,
        labels: {},
        hasScrolled: false
    };

   
    if (typeof Object.preventExtensions !== "function") {
        Object.preventExtensions = function (obj) { return obj; }
    }

    var _rules = {
        // Validate not empty
        NOTEMPTY: /./,
        // Validate a numeric
        NUMERIC: /^[0-9]+$/,
        // Validate an alphanumeric string (no special chars)
        MIXED: /^[\w\s-]+$/,
        // Validate a spaceless string
        NOSPACE: /^[^\s]+$/,
        // Validate a spaceless string at start or end
        TRIM: /^[^\s].*[^\s]$/,
        // Validate a date YYYY-MM-DD
        DATE: /^\d{4}-\d{2}-\d{2}(\s\d{2}:\d{2}(:\d{2})?)?$/,
        // Validate an email
        EMAIL: /^([^@]+?)@(([a-z0-9]-*)*[a-z0-9]+\.)+([a-z0-9]+)$/i,
        // Validate an url
        URL: /^(https?:\/\/)?((([a-z0-9]-*)*[a-z0-9]+\.?)*([a-z0-9]+))(\/[\w?=\.-]*)*$/,
        // Validate a phone number
        PHONE: /^1\d{10}$/,
        // Validate value if it is not empty
        OPTIONAL: /^.*$/,
        // Validate values or length by comparison
        COMPARISON: /^\s*([LV])\s*([<>]=?|==|!=)\s*([^<>=!]+?)\s*$/
    };
    
    var _messages = Object.preventExtensions({
        'default': '$ contain error(s).',
        'NOTEMPTY': '$ must not be empty.',
        'NUMERIC': '$ must be numeric.',
        'STRING': '$ must be a string.',
        'NOSPACE': '$ must not contain spaces.',
        'TRIM': '$ must not start or end with space character.',
        'MIXED': '$ must be letters or numbers (no special characters).',
        'DATE': '$ is not a valid with format YYYY-MM-DD.',
        'EMAIL': '$ is not valid.',
        'URL': '$ is not valid.',
        'PHONE': '$ is not a valid phone number.',
        //'INARRAY': '$ is not a valid option.',
        '<': '$ must be less than % characters.',
        '<=': '$ must be less or equal to % characters.',
        '>': '$ must be greater than % characters.',
        '>=': '$ must be greater or equal to % characters.',
        '==': '$ must be equal to %',
        '!=': '$ must be different than %'
    }),
        _extendedMessages = false;

    /**
     * @private
     * HTML5 data attributes
     */
    var _data = {
        validation: 'data-validation',
        validationMessage: 'data-validation-message',
        regex: 'data-validation-regex',
        regexMessage: 'data-validation-regex-message',
        group: 'data-validation-group',
        label: 'data-validation-label',
        errorList: 'data-error-list'
    };

     var _options = {
         submit: {
             settings: {
                 form: null,
                 display: "inline",
                 insertion: "append",
                 allErrors: false,
                 trigger: "click",
                 button: "input[type='submit']",
                 errorClass: "error",
                 errorListClass: "error-list",
                 inputContainer: null,
                 clear: "focusin",
                 scrollToError: false
             },
             callback: {
                 onInit: null,
                 onValidate: null,
                 onError: null,
                 onBeforeSubmit: null,
                 onSubmit: null,
                 onAfterSubmit: null
             }
         },
         dynamic: {
             settings: {
                 trigger: null,
                 delay: 300
             },
             callback: {
                 onSuccess: null,
                 onError: null,
                 onComplete: null
             }
         },
         messages: {},
         labels: {},
         debug: false
     };

    var _supported = {
        submit: {
            settings: {
                display: ["inline", "block"],
                insertion: ["append", "prepend"], //"before", "insertBefore", "after", "insertAfter"
                allErrors: [true, false],
                clear: ["focusin", "keypress", false],
                trigger: [
                    "click", "dblclick", "focusout",
                    "hover", "mousedown", "mouseenter",
                    "mouseleave", "mousemove", "mouseout",
                    "mouseover", "mouseup", "toggle"
                ]
            }
        },
        dynamic: {
            settings: {
                trigger: ["focusout", "keydown", "keypress", "keyup"]
            }
        },
        debug: [true, false]
    };

    var Validation = function (node, options) {

        var errors = [];
            window.Validation.hasScrolled = false;

        function extendMessages () {

            if (!window.Validation.messages || _extendedMessages) {
                return false;
            }

            _messages = $.extend(_messages, window.Validation.messages);

            _extendedMessages = true;

        }


        function extendOptions () {

            if (!(options instanceof Object)) {
                options = {};
            }

            var tpmOptions = Object.preventExtensions($.extend(true, {}, _options)),
                tmpMessages = Object.preventExtensions($.extend(true, {}, _messages));

            tpmOptions.messages = $.extend(tmpMessages, options.messages || {});

            for (var method in options) {

                if (!options.hasOwnProperty(method) || method === "debug" || method === "messages") {
                    continue;
                }

                if (method === "labels" && options[method] instanceof Object) {
                    tpmOptions[method] = options[method];
                    continue;
                }

                if (!_options[method] || !(options[method] instanceof Object)) {

                    // {debug}
                    options.debug && window.Debug.log({
                        'node': node,
                        'function': 'extendOptions()',
                        'arguments': '{' + method + ': ' + JSON.stringify(options[method]) + '}',
                        'message': 'WARNING - ' + method + ' - invalid option'
                    });
                    // {/debug}

                    continue;
                }

                for (var type in options[method]) {
                    if (!options[method].hasOwnProperty(type)) {
                        continue;
                    }

                    if (!_options[method][type] || !(options[method][type] instanceof Object)) {

                        // {debug}
                        options.debug && window.Debug.log({
                            'node': node,
                            'function': 'extendOptions()',
                            'arguments': '{' + type + ': ' + JSON.stringify(options[method][type]) + '}',
                            'message': 'WARNING - ' + type + ' - invalid option'
                        });
                        // {/debug}

                        continue;
                    }

                    for (var option in options[method][type]) {
                        if (!options[method][type].hasOwnProperty(option)) {
                            continue;
                        }

                        if (_supported[method] &&
                            _supported[method][type] &&
                            _supported[method][type][option] &&
                            $.inArray(options[method][type][option], _supported[method][type][option]) === -1) {

                            // {debug}
                            options.debug && window.Debug.log({
                                'node': node,
                                'function': 'extendOptions()',
                                'arguments': '{' + option + ': ' + JSON.stringify(options[method][type][option]) + '}',
                                'message': 'WARNING - ' + option.toString() + ': ' + JSON.stringify(options[method][type][option]) + ' - unsupported option'
                            });
                            // {/debug}

                            delete options[method][type][option];
                        }

                    }
                    if (tpmOptions[method] && tpmOptions[method][type]) {
                        tpmOptions[method][type] = $.extend(Object.preventExtensions(tpmOptions[method][type]), options[method][type]);
                    }
                }
            }

            // {debug}
            if (options.debug && $.inArray(options.debug, _supported['debug'] !== -1)) {
                tpmOptions.debug = options.debug;
            }
            // {/debug}

            // @TODO Would there be a better fix to solve event conflict?
            if (tpmOptions.dynamic.settings.trigger) {
                if (tpmOptions.dynamic.settings.trigger === "keypress" && tpmOptions.submit.settings.clear === "keypress") {
                    tpmOptions.dynamic.settings.trigger = "keydown";
                }
            }

            options = tpmOptions;

        }

        function delegateDynamicValidation() {

            if (!options.dynamic.settings.trigger) {
                return false;
            }

            // {debug}
            options.debug && window.Debug.log({
                'node': node,
                'function': 'delegateDynamicValidation()',
                'arguments': JSON.stringify(options),
                'message': 'OK - Dynamic Validation activated on ' + $(node).length + ' form(s)'
            });
            // {/debug}

            if ( !$(node).find('[' + _data.validation + '],[' + _data.regex + ']')[0]) {

                // {debug}
                options.debug && window.Debug.log({
                    'node': node,
                    'function': 'delegateDynamicValidation()',
                    'arguments': '$(node).find([' + _data.validation + '],[' + _data.regex + '])',
                    'message': 'ERROR - [' + _data.validation + '] not found'
                });
                // {/debug}

                return false;
            }

            var namespace = ".vd", // validation.delegate
                event = options.dynamic.settings.trigger + namespace;
            if (options.dynamic.settings.trigger !== "focusout") {
                event += " change" + namespace + " paste" + namespace;
            }

            $.each(
                $(node).find('[' + _data.validation + '],[' + _data.regex + ']'),
                function (index, input) {

                    $(input).unbind(event).on(event, function (e) {

                        if ($(this).is(':disabled')) {
                            return false;
                        }

                        //e.preventDefault();

                        var input = this,
                            keyCode = e.keyCode || null;

                        _typeWatch(function () {

                            if (!validateInput(input)) {

                                displayOneError(input.name);
                                _executeCallback(options.dynamic.callback.onError, [node, input, keyCode, errors[input.name]]);

                            } else {

                                _executeCallback(options.dynamic.callback.onSuccess, [node, input, keyCode]);

                            }

                            _executeCallback(options.dynamic.callback.onComplete, [node, input, keyCode]);

                        }, options.dynamic.settings.delay);

                    });
                }
            )
        }

        var _typeWatch = (function(){
            var timer = 0;
            return function(callback, ms){
                clearTimeout (timer);
                timer = setTimeout(callback, ms);
            }
        })();

        function delegateValidation () {

            _executeCallback(options.submit.callback.onInit, [node]);

            var event = options.submit.settings.trigger + '.vd';

            // {debug}
            options.debug && window.Debug.log({
                'node': node,
                'function': 'delegateValidation()',
                'arguments': JSON.stringify(options),
                'message': 'OK - Validation activated on ' + $(node).length + ' form(s)'
            });
            // {/debug}

            if (!$(node).find(options.submit.settings.button)[0]) {

                // {debug}
                options.debug && window.Debug.log({
                    'node': node,
                    'function': 'delegateDynamicValidation()',
                    'arguments': '$(node).find(' + options.submit.settings.button + ')',
                    'message': 'ERROR - ' + options.submit.settings.button + ' not found'
                });
                // {/debug}

                return false;

            }

            $(node).on("submit", false );
            $(node).find(options.submit.settings.button).unbind(event).on(event, function (e) {

                e.preventDefault();

                resetErrors();

                _executeCallback(options.submit.callback.onValidate, [node]);

                if (!validateForm()) {

                    // OnError function receives the "errors" object as the last "extraParam"
                    _executeCallback(options.submit.callback.onError, [node, errors]);

                    displayErrors();

                } else {

                    _executeCallback(options.submit.callback.onBeforeSubmit, [node]);

                    (options.submit.callback.onSubmit) ? _executeCallback(options.submit.callback.onSubmit, [node]) : submitForm();

                    _executeCallback(options.submit.callback.onAfterSubmit, [node]);

                }

                // {debug}
                options.debug && window.Debug.print();
                // {/debug}

                return false;

            });

        }

        function validateForm () {

            var isValid = true;

            $.each(
                $(node).find('[' + _data.validation + '],[' + _data.regex + ']'),
                function (index, input) {

                    if ($(this).is(':disabled')) {
                        return false;
                    }

                    if (!validateInput(input)) {
                        isValid = false;
                    }

                }
            );

            return isValid;

        }

        function validateInput (input) {

            var inputName = $(input).attr('name');

            if (!inputName) {

                // {debug}
                options.debug && window.Debug.log({
                    'node': node,
                    'function': 'validateInput()',
                    'arguments': '$(input).attr("name")',
                    'message': 'ERROR - Missing input [name]'
                });
                // {/debug}

                return false;
            }

            var value = _getInputValue(input),

                matches = inputName.replace(/]$/, '').split(/]\[|[[\]]/g),
                inputShortName = window.Validation.labels[inputName] ||
                                 options.labels[inputName] ||
                                 $(input).attr(_data.label) ||
                                 matches[matches.length - 1],

                validationArray = $(input).attr(_data.validation),
                validationMessage = $(input).attr(_data.validationMessage),
                validationRegex = $(input).attr(_data.regex),
                validationRegexMessage = $(input).attr(_data.regexMessage),

                validateOnce = false;

            if (validationArray) {
                validationArray = _api._splitValidation(validationArray);
            }

            // Validates the "data-validation"
            if (validationArray instanceof Array && validationArray.length > 0) {

                // "OPTIONAL" input will not be validated if it's empty
                if (value === '' && $.inArray('OPTIONAL', validationArray) !== -1) {
                    return true;
                }

                $.each(validationArray, function (i, rule) {

                    if (validateOnce === true) {
                        return true;
                    }

                    try {

                        validateRule(value, rule);

                    } catch (error) {

                        if (validationMessage || !options.submit.settings.allErrors) {
                            validateOnce = true;
                        }

                        error[0] = validationMessage || error[0];

                        registerError(inputName, error[0].replace('$', inputShortName).replace('%', error[1]));

                    }

                });

            }

            if (validationRegex) {

                var pattern = validationRegex.split('/');

                if (pattern.length > 1) {

                    var tmpPattern = "";

                    for (var k = 0; k < pattern.length - 1; k++) {
                        if (pattern[k] !== "") {
                            tmpPattern += pattern[k] + '/';
                        }
                    }

                    tmpPattern = tmpPattern.slice(0, -1);


                    if (/[gimsxeU]+/.test(pattern[pattern.length - 1])) {
                        var patternModifier = pattern[pattern.length - 1];
                    }

                    pattern = tmpPattern;
                } else {
                    pattern = pattern[0];
                }

                try {

                    var rule = new RegExp(pattern, patternModifier);

                } catch (error) {

                    // {debug}
                    options.debug && window.Debug.log({
                        'node': node,
                        'function': 'validateInput()',
                        'arguments': '{pattern: {' + pattern + '}, modifier: {' + patternModifier+ '}',
                        'message': 'WARNING - Invalid [data-validation-regex] on input ' + inputName
                    });
    
                    return true;

                }

                try {

                    validateRule(value, rule);

                } catch (error) {

                    error[0] = validationRegexMessage || error[0];

                    registerError(inputName, error[0].replace('$', inputShortName));

                }

            }

            return !errors[inputName] || errors[inputName] instanceof Array && errors[inputName].length === 0;

        }

        function validateRule (value, rule) {

            if (rule instanceof RegExp) {
                if (rule.test(value)) {
                    throw [options.messages['default'], ''];
                }
                return;
            }

            if (_rules[rule]) {
                if (!_rules[rule].test(value)) {
                    throw [options.messages[rule], ''];
                }
                return;
            }

            var comparison = rule.match(_rules['COMPARISON']);

            if (!comparison || comparison.length !== 4) {

                options.debug && window.Debug.log({
                    'node': node,
                    'function': 'validateRule()',
                    'arguments': 'value: ' + value + ' rule: ' + rule,
                    'message': 'WARNING - Invalid comparison'
                });

                return;
            }

            var type = comparison[1],
                operator = comparison[2],
                compared = comparison[3],
                comparedValue;

            switch (type) {

                case "L":

                    if (isNaN(compared)) {

                        // {debug}
                        options.debug && window.Debug.log({
                            'node': node,
                            'function': 'validateRule()',
                            'arguments': 'compare: ' + compared + ' rule: ' + rule,
                            'message': 'WARNING - Invalid rule, "L" compare must be numeric'
                        });

                        return false;

                    } else {

                        if (!value || eval(value.length + operator + parseFloat(compared)) == false) {
                            throw [options.messages[operator], compared];
                        }

                    }

                    break;

                case "V":
                default:

                    if (isNaN(compared)) {

                        comparedValue = $(node).find('[name="' + compared + '"]').val();
                        if (!comparedValue) {

                            // {debug}
                            options.debug && window.Debug.log({
                                'node': node,
                                'function': 'validateRule()',
                                'arguments': 'compare: ' + compared + ' rule: ' + rule,
                                'message': 'WARNING - Unable to find compared field [name="' + compared + '"]'
                            });
                            // {/debug}

                            return false;
                        }

                        if (!value || !eval('"' + encodeURIComponent(value) + '"' + operator + '"' + encodeURIComponent(comparedValue) + '"')) {
                            throw [options.messages[operator].replace(' characters', ''), compared];
                        }

                    // Compare numeric value
                    } else {

                        if (!value || isNaN(value) || !eval(value + operator + parseFloat(compared))) {
                            throw [options.messages[operator].replace(' characters', ''), compared];
                        }

                    }
                    break;

            }

        }

        function registerError (inputName, error) {

            if (!errors[inputName]) {
                errors[inputName] = [];
            }

            error = error.capitalize();

            var hasError = false;
            for (var i = 0; i < errors[inputName].length; i++) {
                if (errors[inputName][i] === error) {
                    hasError = true;
                    break;
                }
            }

            if (!hasError) {
                errors[inputName].push(error);
            }

        }

        function displayOneError (inputName) {

            var input,
                inputId,
                errorContainer,
                label,
                html = '<div class="' + options.submit.settings.errorListClass + '" ' + _data.errorList + '><ul></ul></div>',
                group,
                groupInput;

            if (!errors.hasOwnProperty(inputName)) {
                return false;
            }

            input = $(node).find('[name="' + inputName + '"]');

            label = null;

            if (!input[0]) {

                // {debug}
                options.debug && window.Debug.log({
                    'node': node,
                    'function': 'displayOneError()',
                    'arguments': '[name="' + inputName + '"]',
                    'message': 'ERROR - Unable to find input by name "' + inputName + '"'
                });
                // {/debug}

                return false;
            }

            group = input.attr(_data.group);

            if (group) {

                groupInput = $(node).find('[name="' + inputName + '"]');
                label = $(node).find('[id="' + group + '"]');

                if (label[0]) {
                    label.addClass(options.submit.settings.errorClass);
                    errorContainer = label;
                }

            } else {

                input.addClass(options.submit.settings.errorClass);

                if (options.submit.settings.inputContainer) {
                    input.parentsUntil(node, options.submit.settings.inputContainer).addClass(options.submit.settings.errorClass)
                }

                inputId = input.attr('id');

                if (inputId) {
                    label = $(node).find('label[for="' + inputId + '"]')[0];
                }

                if (!label) {
                    label = input.parentsUntil(node, 'label')[0];
                }

                if (label) {
                    label = $(label);
                    label.addClass(options.submit.settings.errorClass);
                }
            }

            if (options.submit.settings.display === 'inline') {
                errorContainer = errorContainer || input.parent();
            } else if (options.submit.settings.display === 'block') {
                errorContainer = $(node);
            }

            // Prevent double error list if the previous one has not been cleared.
            if (options.submit.settings.display === 'inline' && errorContainer.find('[' + _data.errorList + ']')[0]) {
                return false;
            }

            if (options.submit.settings.display === "inline" ||
                (options.submit.settings.display === "block" && !errorContainer.find('[' + _data.errorList + ']')[0])
            ) {
                if (options.submit.settings.insertion === 'append') {
                    errorContainer.append(html);
                } else if (options.submit.settings.insertion === 'prepend') {
                    errorContainer.prepend(html);
                }
            }

            for (var i = 0; i < errors[inputName].length; i++) {
                errorContainer.find('ul').append('<li>' + errors[inputName][i] + '</li>');
            }

            if (options.submit.settings.clear || options.dynamic.settings.trigger) {

                if (group && groupInput) {
                    input = groupInput;
                }

                var namespace = ".vr", //validation.resetError
                    event = "coucou" + namespace;
                if (options.submit.settings.clear) {
                    event += " " + options.submit.settings.clear + namespace
                }
                if (options.dynamic.settings.trigger) {
                    event += " " + options.dynamic.settings.trigger + namespace;
                    if (options.dynamic.settings.trigger !== "focusout") {
                        event += " change" + namespace + " paste" + namespace;
                    }
                }

                input.unbind(event).on(event, function (a,b,c,d,e) {

                    return function () {
                        if (e) {
                            if ($(c).hasClass(options.submit.settings.errorClass)) {
                                resetOneError(a,b,c,d,e);
                            }
                        } else if ($(b).hasClass(options.submit.settings.errorClass)) {
                            resetOneError(a,b,c,d);
                        }
                    };

                }(inputName, input, label, errorContainer, group))
            }

            if (options.submit.settings.scrollToError && !window.Validation.hasScrolled) {

                window.Validation.hasScrolled = true;

                var offset = parseFloat(options.submit.settings.scrollToError.offset) || 0,
                    duration = parseFloat(options.submit.settings.scrollToError.duration) || 500,
                    handle = (options.submit.settings.display === 'block') ? errorContainer : input;

                $('html, body').animate({
                    scrollTop: handle.offset().top + offset
                }, duration);

            }

        }

        /**
         * Display all of the errors
         */
        function displayErrors () {

            for (var inputName in errors) {
                displayOneError(inputName);
            }

        }

        function resetOneError(inputName, input, label, container, group) {

            delete errors[inputName];

            if (container) {

                //window.Validation.hasScrolled = false;

                if (options.submit.settings.inputContainer) {
                    (group ? label : input).parentsUntil(node, options.submit.settings.inputContainer).removeClass(options.submit.settings.errorClass)
                }

                label && label.removeClass(options.submit.settings.errorClass);

                input.removeClass(options.submit.settings.errorClass);

                if (options.submit.settings.display === 'inline') {
                    container.find('[' + _data.errorList + ']').remove();
                }

            } else {

                if (!input) {
                    input = $(node).find('[name="' + inputName + '"]');

                    if (!input[0]) {

                        // {debug}
                        options.debug && window.Debug.log({
                            'node': node,
                            'function': 'resetOneError()',
                            'arguments': '[name="' + inputName + '"]',
                            'message': 'ERROR - Unable to find input by name "' + inputName + '"'
                        });
                        // {/debug}

                        return false;
                    }
                }

                //$._data( input[0], "events" );
                input.trigger('coucou.vr');

            }

        }

        function resetErrors () {

            errors = [];
            window.Validation.hasScrolled = false;

            $(node).find('[' + _data.errorList + ']').remove();
            $(node).find('.' + options.submit.settings.errorClass).removeClass(options.submit.settings.errorClass);

        }

        function submitForm () {

            node.submit();

        }

        var _getInputValue = function (input) {

            var value;

            // Get the value or state of the input based on its type
            switch ($(input).attr('type')) {
                case 'checkbox':
                    value = ($(input).is(':checked')) ? 1 : '';
                    break;
                case 'radio':
                    value = $(node).find('input[name="' + $(input).attr('name') + '"]:checked').val() || '';
                    break;
                default:
                    value = $(input).val();
                    break;
            }

            return value;

        };

        var _executeCallback = function (callback, extraParams) {

            if (!callback) {
                return false;
            }

            var _callback;

            if (typeof callback === "function") {

                _callback = callback;

            } else if (typeof callback === "string" || callback instanceof Array) {

                _callback = window;

                if (typeof callback === "string") {
                    callback = [callback, []];
                }

                var _exploded = callback[0].split('.'),
                    _params = callback[1],
                    _isValid = true,
                    _splitIndex = 0;

                while (_splitIndex < _exploded.length) {

                    if (typeof _callback !== 'undefined') {
                        _callback = _callback[_exploded[_splitIndex++]];
                    } else {
                        _isValid = false;
                        break;
                    }
                }

                if (!_isValid || typeof _callback !== "function") {

                    // {debug}
                    options.debug && window.Debug.log({
                        'node': node,
                        'function': '_executeCallback()',
                        'arguments': JSON.stringify(callback),
                        'message': 'WARNING - Invalid callback function"'
                    });
                    // {/debug}

                    return false;
                }

            }

            _callback.apply(this, $.merge(_params || [], (extraParams) ? extraParams : []));
            return true;

        };

        this.__construct = function () {

            extendMessages();
            extendOptions();

            delegateDynamicValidation();
            delegateValidation();

            // {debug}
            options.debug && window.Debug.print();
            // {/debug}

        }();

        return {

            registerError: registerError,

            displayOneError: displayOneError,

            displayErrors: displayErrors,

            resetOneError: resetOneError,

            resetErrors: resetErrors

        };

    };

    $.fn.validate = $.validate = function (options) {

        return _api.validate(this, options);

    };

    $.fn.addValidation = function (validation) {

        return _api.addValidation(this, validation);

    };

    $.fn.removeValidation = function (validation) {

        return _api.removeValidation(this, validation);

    };

    $.fn.addError = function (error) {

        return _api.addError(this, error);

    };

    $.fn.removeError = function (error) {

        return _api.removeError(this, error);

    };

    var _api = {


        _formatValidation: function (validation) {

            validation = validation.toString().replace(/\s/g, '');

            if (validation.charAt(0) === "[" && validation.charAt(validation.length - 1) === "]") {
                validation = validation.replace(/^\[|\]$/g, '');
            }

            return validation;

        },

        _splitValidation: function (validation) {

            var validationArray = this._formatValidation(validation).split(','),
                oneValidation;

            for (var i = 0; i < validationArray.length; i++) {
                oneValidation = validationArray[i];
                if (/^[a-z]+$/i.test(oneValidation)) {
                    validationArray[i] = oneValidation.toUpperCase();
                }
            }

            return validationArray;
        },

        _joinValidation: function (validation) {

            return '[' + validation.join(', ') + ']';

        },

        validate: function (node, options) {

            if (typeof node === "function") {

                if (!options.submit.settings.form) {

                    // {debug}
                    window.Debug.log({
                        'node': node,
                        'function': '$.validate()',
                        'arguments': '',
                        'message': 'Undefined property "options.submit.settings.form - Validation dropped'
                    });

                    window.Debug.print();
                    // {/debug}

                    return;
                }

                node = $(options.submit.settings.form);

                if (!node[0]) {

                    // {debug}
                    window.Debug.log({
                        'node': node,
                        'function': '$.validate()',
                        'arguments': JSON.stringify(options.submit.settings.form),
                        'message': 'Unable to find jQuery form element - Validation dropped'
                    });

                    window.Debug.print();
                    // {/debug}

                    return;
                }

            } else if (typeof node[0] === 'undefined') {

                // {debug}
                window.Debug.log({
                    'node': node,
                    'function': '$.validate()',
                    'arguments': '$("' + node['selector'] + '").validate()',
                    'message': 'Unable to find jQuery form element - Validation dropped'
                });

                window.Debug.print();
                // {/debug}

                return;
            }

            return node.each(function () {

                window.Validation.form[node.selector] = new Validation(this, options);

            });

        },

        addValidation: function (node, validation) {

            var self = this;

            validation = self._splitValidation(validation);

            if (!validation) {
                return false;
            }

            return node.each( function () {

                var $this = $(this),
                    validationData = $this.attr(_data.validation),
                    validationArray = (validationData && validationData.length) ? self._splitValidation(validationData) : [],
                    oneValidation;

                for (var i = 0; i < validation.length; i++) {

                    oneValidation = self._formatValidation(validation[i]);

                    if ($.inArray(oneValidation, validationArray) === -1) {
                        validationArray.push(oneValidation);
                    }
                }

                if (validationArray.length) {
                    $this.attr(_data.validation, self._joinValidation(validationArray));
                }

            });

        },

        removeValidation: function (node, validation) {

            var self = this;

            validation = self._splitValidation(validation);
            if (!validation) {
                return false;
            }

            return node.each( function () {

                var $this = $(this),
                    validationData = $this.attr(_data.validation),
                    validationArray = (validationData && validationData.length) ? self._splitValidation(validationData) : [],
                    oneValidation,
                    validationIndex;

                if (!validationArray.length) {
                    $this.removeAttr(_data.validation);
                    return true;
                }

                for (var i = 0; i < validation.length; i++) {
                    oneValidation = self._formatValidation(validation[i]);
                    validationIndex = $.inArray(oneValidation, validationArray);
                    if (validationIndex !== -1) {
                        validationArray.splice(validationIndex, 1);
                    }

                }

                if (!validationArray.length) {
                    $this.removeAttr(_data.validation);
                    return true;
                }

                $this.attr(_data.validation, self._joinValidation(validationArray));

            });

        },

        addError: function (node, error) {

            if (!window.Validation.form[node.selector]) {

                // {debug}
                window.Debug.log({
                    'node': node,
                    'function': '$.addError()',
                    'arguments': 'window.Validation.form[' + JSON.stringify(node.selector) + ']',
                    'message': 'ERROR - Invalid node selector'
                });

                window.Debug.print();
                // {/debug}

                return false;
            }

            if (typeof error !== "object" || Object.prototype.toString.call(error) !== "[object Object]") {

                // {debug}
                window.Debug.log({
                    'node': node,
                    'function': '$.addError()',
                    'arguments': 'window.Validation.form[' + JSON.stringify(node.selector) + ']',
                    'message': 'ERROR - Invalid argument, must be type object'
                });

                window.Debug.print();
                // {/debug}

                return false;
            }

            var input,
                onlyOnce = true;
            for (var inputName in error) {

                if (!error.hasOwnProperty(inputName)) {
                    continue;
                }

                if (!(error[inputName] instanceof Array)) {
                    error[inputName] = [error[inputName]];
                }

                input = $(node.selector).find('[name="'+ inputName + '"]');
                if (!input[0]) {

                    // {debug}
                    window.Debug.log({
                        'node': node,
                        'function': '$.addError()',
                        'arguments': JSON.stringify(inputName),
                        'message': 'ERROR - Unable to find ' + '$(' + node.selector + ').find("[name="'+ inputName + '"]")'
                    });

                    window.Debug.print();
                    // {/debug}

                    continue;
                }

                if (onlyOnce) {
                    window.Validation.hasScrolled = false;
                    onlyOnce = false;
                }

                window.Validation.form[node.selector].resetOneError(inputName, input);

                for (var i = 0; i < error[inputName].length; i++) {

                    if (typeof error[inputName][i] !== "string") {

                        // {debug}
                        window.Debug.log({
                            'node': node,
                            'function': '$.addError()',
                            'arguments': JSON.stringify(error[inputName][i]),
                            'message': 'ERROR - Invalid error object property - Accepted format: {"inputName": "errorString"} or {"inputName": ["errorString", "errorString"]}'
                        });

                        window.Debug.print();
                        // {/debug}

                        continue;
                    }

                    window.Validation.form[node.selector].registerError(inputName, error[inputName][i]);

                }

                window.Validation.form[node.selector].displayOneError(inputName);

            }

        },

        removeError: function (node, inputName) {

            if (!window.Validation.form[node.selector]) {

                // {debug}
                window.Debug.log({
                    'node': node,
                    'function': '$.removeError()',
                    'arguments': 'window.Validation.form[' + JSON.stringify(node.selector) + ']',
                    'message': 'ERROR - Invalid node selector'
                });

                window.Debug.print();
                // {/debug}

                return false;
            }

            if (!inputName) {
                window.Validation.form[node.selector].resetErrors();
                return false;
            }

            if (typeof inputName === "object" && Object.prototype.toString.call(inputName) !== "[object Array]") {

                // {debug}
                window.Debug.log({
                    'node': node,
                    'function': '$.removeError()',
                    'arguments': JSON.stringify(inputName),
                    'message': 'ERROR - Invalid inputName, must be type String or Array'
                });

                window.Debug.print();
                // {/debug}

                return false;
            }

            if (!(inputName instanceof Array)) {
                inputName = [inputName];
            }

            var input;
            for (var i = 0; i < inputName.length; i++) {

                input = $(node.selector).find('[name="'+ inputName[i] + '"]');
                if (!input[0]) {

                    // {debug}
                    window.Debug.log({
                        'node': node,
                        'function': '$.removeError()',
                        'arguments': JSON.stringify(inputName[i]),
                        'message': 'ERROR - Unable to find ' + '$(' + node.selector + ').find("[name="'+ inputName[i] + '"]")'
                    });

                    window.Debug.print();
                    // {/debug}

                    continue;
                }

                window.Validation.form[node.selector].resetOneError(inputName[i], input);

            }

        }

    };

    // {debug}
    window.Debug = {

        table: {},
        log: function (debugObject) {

            if (!debugObject.message || typeof debugObject.message !== "string") {
                return false;
            }

            this.table[debugObject.message] = $.extend(
                Object.preventExtensions(
                    {
                        'node': '',
                        'function': '',
                        'arguments': ''
                    }
                ), debugObject
            )

        },
        print: function () {

            if ($.isEmptyObject(this.table)) {
                return false;
            }

            if (console.group !== undefined || console.table !== undefined) {

                console.groupCollapsed('--- jQuery Form Validation Debug ---');

                if (console.table) {
                    console.table(this.table);
                } else {
                    $.each(this.table, function (index, data) {
                        console.log(data['Name'] + ': ' + data['Execution Time']+'ms');
                    });
                }

                console.groupEnd();

            } else {
                console.log('Debug is not available on your current browser, try the most recent version of Chrome or Firefox.');
            }

            this.table = {};

        }

    };
    // {/debug}

    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    };

    window.JSON.stringify = JSON.stringify || function (obj) {
        var t = typeof (obj);
        if (t !== "object" || obj === null) {
            // simple data type
            if (t === "string") {
                obj = '"' + obj + '"';
            }
            return String(obj);
        }
        else {
            // recurse array or object
            var n, v, json = [], arr = (obj && obj.constructor === Array);
            for (n in obj) {
                // jslint hack to validate for..in
                if (true) {
                    v = obj[n];
                    t = typeof(v);
                    if (t === "string") {
                        v = '"' + v + '"';
                    }
                    else if (t === "object" && v !== null) {
                        v = JSON.stringify(v);
                    }
                    json.push((arr ? "" : '"' + n + '": ') + String(v));
                }
            }
            return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
        }
    };

}(window, document, window.jQuery));