/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/**
 * @class Ext.layout.Layout
 * @extends Object
 * Base Layout class - extended by ComponentLayout and ContainerLayout
 */
Ext.define('Ext.layout.Layout', {

    /* Begin Definitions */

    /* End Definitions */

    isLayout: true,
    initialized: false,

    statics: {
        create: function(layout, defaultType) {
            var type;
            if (layout instanceof Ext.layout.Layout) {
                return Ext.createByAlias('layout.' + layout);
            } else {
                if (!layout || typeof layout === 'string') {
                    type = layout || defaultType;
                    layout = {};                    
                }
                else {
                    type = layout.type;
                }
                return Ext.createByAlias('layout.' + type, layout || {});
            }
        }
    },

    constructor : function(config) {
        this.id = Ext.id(null, this.type + '-');
        Ext.apply(this, config);
    },

    /**
     * @private
     */
    layout : function() {
        var me = this;
        me.layoutBusy = true;
        me.initLayout();

        if (me.beforeLayout.apply(me, arguments) !== false) {
            me.layoutCancelled = false;
            me.onLayout.apply(me, arguments);
            me.childrenChanged = false;
            me.owner.needsLayout = false;
            me.layoutBusy = false;
            me.afterLayout.apply(me, arguments);
        }
        else {
            me.layoutCancelled = true;
        }
        me.layoutBusy = false;
        me.doOwnerCtLayouts();
    },

    beforeLayout : function() {
        this.renderChildren();
        return true;
    },

    renderChildren: function () {
        var me = this;
        me.renderItems(me.getLayoutItems(), me.getRenderTarget());
    },

    /**
     * @private
     * Iterates over all passed items, ensuring they are rendered.  If the items are already rendered,
     * also determines if the items are in the proper place dom.
     */
    renderItems : function(items, target) {
        var ln = items.length,
            i = 0,
            item;

        for (; i < ln; i++) {
            item = items[i];
            if (item && !item.rendered) {
                this.renderItem(item, target, i);
            }
            else if (!this.isValidParent(item, target, i)) {
                this.moveItem(item, target, i);
            }
        }
    },

    // @private - Validates item is in the proper place in the dom.
    isValidParent : function(item, target, position) {
        var dom = item.el ? item.el.dom : Ext.getDom(item);
        if (dom && target && target.dom) {
            if (Ext.isNumber(position) && dom !== target.dom.childNodes[position]) {
                return false;
            }
            return (dom.parentNode == (target.dom || target));
        }
        return false;
    },

    /**
     * @private
     * Renders the given Component into the target Element.
     * @param {Ext.Component} item The Component to render
     * @param {Ext.Element} target The target Element
     * @param {Number} position The position within the target to render the item to
     */
    renderItem : function(item, target, position) {
        var me = this;
        if (!item.rendered) {
            if (me.itemCls) {
                item.addCls(me.itemCls);
            }
            if (me.owner.itemCls) {
                item.addCls(me.owner.itemCls);
            }
            item.render(target, position);
            me.configureItem(item);
            me.childrenChanged = true;
        }
    },

    /**
     * @private
     * Moved Component to the provided target instead.
     */
    moveItem : function(item, target, position) {
        // Make sure target is a dom element
        target = target.dom || target;
        if (typeof position == 'number') {
            position = target.childNodes[position];
        }
        target.insertBefore(item.el.dom, position || null);
        item.container = Ext.get(target);
        this.configureItem(item);
        this.childrenChanged = true;
    },

    /**
     * @private
     * Adds the layout's targetCls if necessary and sets
     * initialized flag when complete.
     */
    initLayout : function() {
        if (!this.initialized && !Ext.isEmpty(this.targetCls)) {
            this.getTarget().addCls(this.targetCls);
        }
        this.initialized = true;
    },

    // @private Sets the layout owner
    setOwner : function(owner) {
        this.owner = owner;
    },

    // @private - Returns empty array
    getLayoutItems : function() {
        return [];
    },

    /**
     * @private
     * Applies itemCls
     * Empty template method
     */
    configureItem: Ext.emptyFn,
    
    // Placeholder empty functions for subclasses to extend
    onLayout : Ext.emptyFn,
    afterLayout : Ext.emptyFn,
    onRemove : Ext.emptyFn,
    onDestroy : Ext.emptyFn,
    doOwnerCtLayouts : Ext.emptyFn,

    /**
     * @private
     * Removes itemCls
     */
    afterRemove : function(item) {
        var me = this,
            el = item.el,
            owner = me.owner;
            
        // Clear managed dimensions flag when removed from the layout.
        if (item.rendered) {
            if (me.itemCls) {
                el.removeCls(me.itemCls);
            }
            if (owner.itemCls) {
                el.removeCls(owner.itemCls);
            }
        }

        // These flags are set at the time a child item is added to a layout.
        // The layout must decide if it is managing the item's width, or its height, or both.
        // See AbstractComponent for docs on these properties.
        delete item.layoutManagedWidth;
        delete item.layoutManagedHeight;
    },

    /*
     * Destroys this layout. This is a template method that is empty by default, but should be implemented
     * by subclasses that require explicit destruction to purge event handlers or remove DOM nodes.
     * @protected
     */
    destroy : function() {
        if (!Ext.isEmpty(this.targetCls)) {
            var target = this.getTarget();
            if (target) {
                target.removeCls(this.targetCls);
            }
        }
        this.onDestroy();
    }
});
