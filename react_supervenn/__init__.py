''' A modified version of https://github.com/gecko984/supervenn which
replaces matplotlib with an interactive react component.
'''

import uuid
import json
from pathlib import Path
from textwrap import dedent

from IPython.display import display, HTML, Javascript
from supervenn._algorithms import (
  get_chunks_and_composition_array,
  get_permutations,
  DEFAULT_MAX_BRUTEFORCE_SIZE,
  DEFAULT_SEEDS,
  DEFAULT_NOISE_PROB,
)

DEFAULT_COLOR_CYCLE = [
    'rgb(31, 119, 180)',
    'rgb(255, 127, 14)',
    'rgb(44, 160, 44)',
    'rgb(214, 39, 40)',
    'rgb(148, 103, 189)',
    'rgb(140, 86, 75)',
    'rgb(227, 119, 194)',
    'rgb(127, 127, 127)',
    'rgb(188, 189, 34)',
    'rgb(23, 190, 207)',
]

def get_widths_balancer(widths, minmax_ratio=0.02):
    """
    Given a list of positive numbers, find a linear function, such that when applied to the numbers, the maximum value
    remains the same, and the minimum value is minmax_ratio times the maximum value.
    :param widths: list of numbers
    :param minmax_ratio: the desired max / min ratio in the transformed list.
    :return: a linear function with one float argument that has the above property
    """
    if not 0 <= minmax_ratio <= 1:
        raise ValueError('minmax_ratio must be between 0 and 1')
    max_width = max(widths)
    min_width = min(widths)
    if 1.0 * min_width / max_width >= minmax_ratio:
        slope = 1
        intercept = 0
    else:
        slope = max_width * (1.0 - minmax_ratio) / (max_width - min_width)
        intercept = max_width * (max_width * minmax_ratio - min_width) / (max_width - min_width)

    def balancer(width):
        return slope * width + intercept

    return balancer

def supervenn(sets, set_annotations=None,
              chunks_ordering='minimize gaps', sets_ordering=None,
              reverse_chunks_order=True, reverse_sets_order=True,
              max_bruteforce_size=DEFAULT_MAX_BRUTEFORCE_SIZE, seeds=DEFAULT_SEEDS,
              noise_prob=DEFAULT_NOISE_PROB, min_width_for_annotation=1,
              widths_minmax_ratio=None, rotate_col_annotations=False,
              color_by='row', color_cycle=DEFAULT_COLOR_CYCLE, alternating_background=True,
              **kw):
    """
    Plot a diagram visualizing relationship of multiple sets.
    :param sets: list of sets
    :param set_annotations: list of annotations for the sets
    :param chunks_ordering: method of ordering the chunks (columns of the grid)
        - 'minimize gaps' (default): use a smart algorithm to find an order of columns giving fewer gaps in each row,
            making the plot as readable as possible.
        - 'size': bigger chunks go first (or last if reverse_chunks_order=False)
        - 'occurence': chunks that are in most sets go first (or last if reverse_chunks_order=False)
        - 'random': randomly shuffle the columns
    :param sets_ordering: method of ordering the sets (rows of the grid)
        - None (default): keep the order as it is passed
        - 'minimize gaps': use a smart algorithm to find an order of rows giving fewer gaps in each column
        - 'size': bigger sets go first (or last if reverse_sets_order = False)
        - 'chunk count': sets that contain most chunks go first (or last if reverse_sets_order = False)
        - 'random': randomly shuffle
    :param reverse_chunks_order: True (default) / False when chunks_ordering is "size" or "occurence",
        chunks with bigger corresponding property go first if reverse_chunks_order=True, smaller go first if False.
    :param reverse_sets_order: True / False, works the same way as reverse_chunks_order
    :param max_bruteforce_size: maximal number of items for which bruteforce method is applied to find permutation
    :param seeds: number of different random seeds for the randomized greedy algorithm to find permutation
    :param noise_prob: probability of given element being equal to 1 in the noise array for randomized greedy algorithm
    :param min_width_for_annotation: for horizontal plot, don't annotate bars of widths less than this value (to avoid
    clutter)
    :param widths_minmax_ratio: desired max/min ratio of displayed chunk widths, default None (show actual widths)
    :param rotate_col_annotations: True / False, whether to print annotations vertically
    :param color_by: 'row' (default) or 'column'. If 'row', all cells in same row are same color, etc.
    :param color_cycle: a list of set colors, given as names of matplotlib named colors, or hex codes (e.g. '#1f77b4')
    :param alternating_background: True (default) / False - give avery second row a slight grey tint
    :return: IPython.HTML instance for displaying the plot
    """

    if set_annotations is None:
        set_annotations = ['Set_{}'.format(i) for i in range(len(sets))]

    chunks, composition_array = get_chunks_and_composition_array(sets)

    # Find permutations of rows and columns
    permutations_ = get_permutations(
        chunks,
        composition_array,
        chunks_ordering=chunks_ordering,
        sets_ordering=sets_ordering,
        reverse_chunks_order=reverse_chunks_order,
        reverse_sets_order=reverse_sets_order,
        max_bruteforce_size=max_bruteforce_size,
        seeds=seeds,
        noise_prob=noise_prob)

    # Apply permutations
    chunks = [chunks[i] for i in permutations_['chunks_ordering']]
    composition_array = composition_array[:, permutations_['chunks_ordering']]
    composition_array = composition_array[permutations_['sets_ordering'], :]
    set_annotations = [set_annotations[i] for i in permutations_['sets_ordering']]

    # Main plot
    chunk_sizes = [len(chunk) for chunk in chunks]

    if widths_minmax_ratio is not None:
        widths_balancer = get_widths_balancer(chunk_sizes, widths_minmax_ratio)
        col_widths = [widths_balancer(chunk_size) for chunk_size in chunk_sizes]
        effective_min_width_for_annotation = widths_balancer(min_width_for_annotation)
    else:
        col_widths = chunk_sizes
        effective_min_width_for_annotation = min_width_for_annotation
    #
    return dict(
        sets=[list(s) for s in sets],
        set_annotations=set_annotations,
        chunks=[list(s) for s in chunks],
        composition_array=composition_array.tolist(),
        effective_min_width_for_annotation=effective_min_width_for_annotation,
        col_widths=col_widths,
        n_items=sum(len(s) for s in chunks),
        ycounts=composition_array.sum(axis=0).tolist(),
        rotate_col_annotations=rotate_col_annotations,
        color_by=color_by,
        color_cycle=color_cycle,
        alternating_background=alternating_background,
    )

def react_supervenn_js():
    return open(Path(__file__).parent/'react_supervenn.js', 'r').read()

def define_react_supervenn(include_require=False, require_cdn=False):
    if include_require:
        if require_cdn is True:
            require_cdn = 'https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.min.js'
        elif require_cdn is False:
            require_cdn = '/static/components/requirejs/require.js'
        display(HTML(f'<script src={repr(require_cdn)}></script>'))
    display(Javascript(react_supervenn_js()))

_defined = False

def ReactSupervenn(sets, set_annotations=None,
              chunks_ordering='minimize gaps', sets_ordering=None,
              reverse_chunks_order=True, reverse_sets_order=True,
              max_bruteforce_size=DEFAULT_MAX_BRUTEFORCE_SIZE, seeds=DEFAULT_SEEDS,
              noise_prob=DEFAULT_NOISE_PROB, min_width_for_annotation=1,
              widths_minmax_ratio=None, rotate_col_annotations=False,
              color_by='row', color_cycle=DEFAULT_COLOR_CYCLE, alternating_background=True,
              id=None, include_require=False, force_define=False, require_cdn=False,
              width='100%', height='500px', **kwargs):
    global _defined
    if force_define or not _defined:
        define_react_supervenn(include_require=include_require, require_cdn=require_cdn)
        _defined = True
    if id is None:
        id = str(uuid.uuid4())
    props = supervenn(sets,
        set_annotations=set_annotations,
        chunks_ordering=chunks_ordering,
        sets_ordering=sets_ordering,
        reverse_chunks_order=reverse_chunks_order,
        reverse_sets_order=reverse_sets_order,
        max_bruteforce_size=max_bruteforce_size,
        seeds=seeds,
        noise_prob=noise_prob,
        min_width_for_annotation=min_width_for_annotation,
        widths_minmax_ratio=widths_minmax_ratio,
        rotate_col_annotations=rotate_col_annotations,
        color_by=color_by,
        color_cycle=color_cycle,
        alternating_background=alternating_background,
    )
    props.update(width=width, height=height)
    return HTML(dedent(f'''
        <div id="{id}"></div>
        <script>
            require(['react_supervenn'], function (react_supervenn) {{
                try {{
                    var self = document.getElementById('{id}')
                    while (self.children.length > 0) self.children[0].remove()
                    react_supervenn.ReactSupervenn(
                        self,
                        {json.dumps(props)}
                    )
                }} catch (e) {{
                    console.error(e)
                    var self = document.getElementById('{id}')
                    self.innerHTML = '<b style="color:red">' + e + '</b>'
                }}
            }}, function (e) {{
                console.error(e)
                var self = document.getElementById('{id}')
                self.innerHTML = '<b style="color:red">' + e + '</b>'
            }})
        </script>
        '''))
