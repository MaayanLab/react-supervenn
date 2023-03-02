import React from 'react';
import './ReactSupervenn.css';
/**
 * A react component to render supervenn in HTML
 *
 */
declare const ReactSupervenn: React.FC<{
    /**
     * list of sets
     */
    sets: number[][];
    /**
     * list of annotations for the sets
     */
    set_annotations: string[];
    /**
     * list of chunks
     */
    chunks: number[][];
    /**
     *
     */
    composition_array: number[][];
    /**
     *
     */
    effective_min_width_for_annotation: number;
    /**
     *
     */
    col_widths: number[];
    /**
     *
     */
    n_items: number;
    /**
     *
     */
    ycounts: number[];
    /**
     * True / False, whether to print annotations vertically
     */
    rotate_col_annotations: boolean;
    /**
     *
     */
    color_by: 'row' | 'column';
    /**
     * a list of set colors, given as names of matplotlib named colors, or hex codes (e.g. '#1f77b4')
     */
    color_cycle: string[];
    /**
     * True (default) / False - give avery second row a slight grey tint
     */
    alternating_background: boolean;
    /**
     * The singular label to use when referring to the sets
     */
    set_label?: string;
    /**
     * The singular label to use when referring to the items
     */
    item_label?: string;
    /**
     * Allow parent to control selection
     */
    selection?: Record<string, boolean>;
    /**
     * Allow parent to control selection
     */
    onSelectionChange?: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}>;
export default ReactSupervenn;
