/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/**
 * @class Ext.slider.Tip
 * @extends Ext.tip.Tip
 * Simple plugin for using an Ext.tip.Tip with a slider to show the slider value. In general this
 * class is not created directly, instead pass the {@link Ext.slider.Multi#useTips} and 
 * {@link Ext.slider.Multi#tipText} configuration options to the slider directly.
 * {@img Ext.slider.Tip/Ext.slider.Tip1.png Ext.slider.Tip component}
 * Example usage:
<pre>
    Ext.create('Ext.slider.Single', {
        width: 214,
        minValue: 0,
        maxValue: 100,
        useTips: true,
        renderTo: Ext.getBody()
    });   
</pre>
 * Optionally provide your own tip text by passing tipText:
 <pre>
 new Ext.slider.Single({
     width: 214,
     minValue: 0,
     maxValue: 100,
     useTips: true,
     tipText: function(thumb){
         return Ext.String.format('<b>{0}% complete</b>', thumb.value);
     }
 });
 </pre>
 */
Ext.define('Ext.slider.Tip', {
    extend: 'Ext.tip.Tip',
    minWidth: 10,
    alias: 'widget.slidertip',
    offsets : [0, -10],
    
    isSliderTip: true,

    init: function(slider) {
        var me = this;
        
        slider.on({
            scope    : me,
            dragstart: me.onSlide,
            drag     : me.onSlide,
            dragend  : me.hide,
            destroy  : me.destroy
        });
    },
    /**
     * @private
     * Called whenever a dragstart or drag event is received on the associated Thumb. 
     * Aligns the Tip with the Thumb's new position.
     * @param {Ext.slider.MultiSlider} slider The slider
     * @param {Ext.EventObject} e The Event object
     * @param {Ext.slider.Thumb} thumb The thumb that the Tip is attached to
     */
    onSlide : function(slider, e, thumb) {
        var me = this;
        me.show();
        me.update(me.getText(thumb));
        me.doComponentLayout();
        me.el.alignTo(thumb.el, 'b-t?', me.offsets);
    },

    /**
     * Used to create the text that appears in the Tip's body. By default this just returns
     * the value of the Slider Thumb that the Tip is attached to. Override to customize.
     * @param {Ext.slider.Thumb} thumb The Thumb that the Tip is attached to
     * @return {String} The text to display in the tip
     */
    getText : function(thumb) {
        return String(thumb.value);
    }
});
