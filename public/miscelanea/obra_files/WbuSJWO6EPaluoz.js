window.aui.amd_define('@amzn/aui-overlays.functions', ['@amzn/flow.routing-kata-functions'], (function (require$$0) { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	var _public = {};

	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(_public, "__esModule", { value: true });
	const flow_routing_kata_functions_1 = __importDefault(require$$0);
	const functionBag = (_context) => {
	    return {
	        createModal: (template, options) => {
	            window.P.when('A', 'a-modal', 'ready').execute(`a-modal-create-${template}`, function (A, modal) {
	                const preloadContent = A.$(`[k-preload-id="${template}"]`);
	                const trigger = A.$(`[id="${template}-trigger"]`);
	                const preloadContentId = `a-popover-${template}`;
	                // only set id for the first matched element
	                if (preloadContent.length === 1) {
	                    preloadContent.prop('id', preloadContentId);
	                }
	                const triggerId = `a-modal-trigger-${template}`;
	                // only set id for the first matched element
	                if (trigger.length === 1) {
	                    trigger.prop('id', triggerId);
	                }
	                const params = {
	                    name: template,
	                    popoverLabel: options.popoverLabel,
	                    header: options.header,
	                    width: options.width,
	                    height: options.height,
	                };
	                modal.create(trigger, params);
	            });
	            return {
	                // unused value; trigger id is provided by the server-side implementation
	                triggerId: '',
	                show: () => {
	                    window.P.when('a-modal', 'ready').execute(`a-modal-show-${template}`, function (modal) {
	                        var createdModal = modal.get(template);
	                        if (createdModal && createdModal.show)
	                            createdModal.show();
	                    });
	                },
	                hide: () => {
	                    window.P.when('a-modal', 'ready').execute(`a-modal-hide-${template}`, function (modal) {
	                        var createdModal = modal.get(template);
	                        if (createdModal && createdModal.hide)
	                            createdModal.hide();
	                    });
	                },
	            };
	        },
	        createPopover: (template, options) => {
	            window.P.when('A', 'a-popover', 'ready').execute(`a-popover-create-${template}`, function (A, popover) {
	                const preloadContent = A.$(`[k-preload-id="${template}"]`);
	                const triggerById = A.$(`[id="${template}-trigger"]`);
	                const triggerByCustomAttr = A.$(`[a-popover-trigger-id="${template}-trigger"]`);
	                const trigger = triggerById.length > 0 ? triggerById : triggerByCustomAttr;
	                const preloadContentId = `a-popover-${template}`;
	                // only set id for the first matched element
	                if (preloadContent.length === 1) {
	                    preloadContent.prop('id', preloadContentId);
	                }
	                const triggerId = `a-popover-trigger-${template}`;
	                // only set id for the first matched element
	                if (trigger.length === 1) {
	                    trigger.prop('id', triggerId);
	                }
	                const positionMap = {
	                    top: 'triggerTop',
	                    bottom: 'triggerBottom',
	                    left: 'triggerLeft',
	                    right: 'triggerRight',
	                };
	                const params = {
	                    name: template,
	                    popoverLabel: options.popoverLabel,
	                    closeButtonLabel: options.closeButtonLabel,
	                    header: options.header,
	                    activate: options.activate == 'press' ? 'onclick' : 'onmouseover',
	                    position: options.position ? positionMap[options.position] : undefined,
	                };
	                popover.create(trigger, params);
	            });
	            return {
	                // unused value; trigger id is provided by the server-side implementation
	                triggerId: '',
	            };
	        },
	        createBottomSheet: (template, options) => {
	            window.P.when('A', 'a-sheet', 'ready').execute(`a-sheet-create-${template}`, function (A, bottomSheet) {
	                const preloadContent = A.$(`[k-preload-id="${template}"]`);
	                const preloadContentId = `a-bottomsheet-content-${template}`;
	                // only set id for the first matched element
	                if (preloadContent.length === 1) {
	                    preloadContent.prop('id', preloadContentId);
	                }
	                const params = {
	                    name: `a-bottomsheet-name-${template}`,
	                    preloadDomId: preloadContentId,
	                    heading: options.header,
	                    height: options.height,
	                    closeType: 'icon',
	                    sheetLabel: options.sheetLabel,
	                    sheetDescription: options.sheetDescription,
	                };
	                bottomSheet.create(params);
	            });
	            return {
	                show: () => {
	                    window.P.when('a-sheet', 'ready').execute(`a-sheet-show-${template}`, function (bottomSheet) {
	                        bottomSheet.get(`a-bottomsheet-name-${template}`).show();
	                    });
	                },
	                hide: () => {
	                    window.P.when('a-sheet', 'ready').execute(`a-sheet-hide-${template}`, function (bottomSheet) {
	                        bottomSheet.get(`a-bottomsheet-name-${template}`).hide();
	                    });
	                },
	            };
	        },
	        generateUniqueId: () => {
	            return '';
	        },
	        createToast: (content, options) => {
	            // Static content only - either string or object
	            showStaticToast(content, options);
	        },
	    };
	};
	// Helper function for creating static toasts
	function showStaticToast(content, options) {
	    const toastId = `toast-${Date.now()}`;
	    window.P.when('A', 'a-toast', 'ready').execute(`a-toast-create-${toastId}`, function (_, toast) {
	        var toastInstance = new toast({
	            content: typeof content === 'string'
	                ? content
	                : {
	                    message: content.message,
	                    linkData: content.linkData
	                        ? buildWebLinkData(content.linkData)
	                        : undefined,
	                },
	            label: options.toastLabel,
	            timeout: options.timeout, // no-op until implemented in AUI3
	        });
	        toastInstance.show();
	    });
	}
	// Map our linkData to AUI3 a-toast linkData. AUI3 accepts either `callback`
	// (a handler run on tap, e.g. to open an a-sheet) or `href` (navigation). We
	// prefer callback when provided; otherwise resolve the route to an href.
	function buildWebLinkData(linkData) {
	    if (typeof linkData.callback === 'function') {
	        return { text: linkData.text, callback: linkData.callback };
	    }
	    if (linkData.route) {
	        return { text: linkData.text, href: (0, flow_routing_kata_functions_1.default)().resolveUrl(linkData.route) || '#' };
	    }
	    return undefined;
	}
	var _default = _public.default = functionBag;

	return _default;

}));
