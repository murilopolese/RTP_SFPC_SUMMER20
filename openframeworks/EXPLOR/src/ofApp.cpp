#include "ofApp.h"

int image[19600];
int display[19600];

bool in_bounds(int x, int y) {
    return x > 0 && x < 141 && y > 0 && y < 141;
}
int get_i(int x, int y) {
    return x + y * 140;
}

/*
 > NUM (x,y) has a value (0-3) of the number currently stored in cell x,y; if (x,y) is off of the internally represented surface, the value of NUM (x,y) is 4.
*/
int NUM(int x, int y) {
    if (!in_bounds(x, y)) {
        return 0;
    }
    int i = get_i(x, y);
    return image[i] & 0b11;
}
int DISPLAY(int x, int y) {
    if (!in_bounds(x, y)) {
        return 0;
    }
    int i = get_i(x, y);
    return display[i] & 0b11;
}

/*
 > NE (min,max), pronounced "any," has, on each usage, a new randomly-selected value from min thru max; max may be less then min and either or both may be negative but the difference [max-min] must be less than 199
 
 Let's not be so rigorous about the difference max-min but let's also keep in mind that all numbers available at that time were 8 bit numbers: 0 to 255
 */
int NE(int min, int max) {
    return (int) ofRandom(min, max);
}

/*
 > SHOW (x, y, w, h) will cause a printout showing the contents of the specified rectangle. The specified area will be truncated if it exceeds the area actually represented in the machine or if it is too wide for the device used for output. Digits 0, 1, 2, 3 appear as a grey scale respectively.
 
 The rectangles position is at its center.
 */
void SHOW(int x, int y, int w, int h) {
    int left = x - w / 2;
    int right = x + w / 2;
    int top = y - h / 2;
    int bottom = y + h / 2;
    
    // lx and ly are the _l_ocal coordinates
    for (int lx = left; lx < right; lx++) {
        for(int ly = top; ly < bottom; ly++) {
            if (in_bounds(lx, ly)) {
                int i = get_i(lx, ly);
                int value = NUM(lx, ly);
                display[i] = image[i];
            }
        }
    }
}

/*
 > PUT (x,y,n) will put at coordinates (x,y) the number n (i.e., overwrite the previous contents). If n is larger than 3, the cell remains unchanged.
 
 */
void PUT(int x, int y, int n) {
    if (in_bounds(x, y)) {
        if (n < 4) {
            int i = get_i(x, y);
            image[i] = n;
        }
    }
}

/*
 > PUT4 (x,y,n) where n is a 4-digit number will cause the leftmost digit to be "put" at (x,y), the next to be put at (x+l,y) etc. If any digit is larger than 3, the corresponding cell is not changed.
 
 4 digit number = 1234 = 0b00 0b00 0b00 0b00
 */
void PUT4(int x, int y, int n) {
    for (int lx = 0; lx < 4; lx++) {
        int value = n;
        value = value / pow(10, 3-lx); // Base 10 digit shifting :s
        value = value % 10;
        PUT(x+lx, y, value);
    }
}

/*
 > PUT16 (x,y,nl,n2,n3,n4) where nl through n4 are each 4-digit numbers, "puts" or writes the 16 digits into 16 successive cells (x,y), (x+l,y) etc. Note that a series of calls to PUT16 with decreasing y values can serve to place an explicit 2-dimensional pattern onto the internal grid:
     PUT16(50, 40, 3311, 3333, 3311, 3311)
     PUT16(50, 39, 3311, 3311, 3311, 3311)
     PUT16(50, 38, 3311, 3311, 3311, 3311)
     PUT16(50, 37, 3333, 3311, 3333, 3311)
 */
void PUT16(int x, int y, int n1, int n2, int n3, int n4) {
    PUT4(   x, y, n1);
    PUT4( x+4, y, n2);
    PUT4( x+8, y, n3);
    PUT4(x+12, y, n4);
}

/*
 > CHANJ (x,y,w,h,%,rule) pronounced "change" - causes the contents of the specified rectangular area to be changed according to the specified rule: rule is a 4-digit number saying, from left to right what the digits 0, I, 2 and 3 are to be changed into. Thus the rule 1033 says that O's become l's, l's are to become O's, 2's become 3's, and 3's remain unchanged (become 3's).
 
 */
void CHANJ(int x, int y, int w, int h, int p, int rule) {
    int left = x - w / 2;
    int right = x + w / 2;
    int top = y - h / 2;
    int bottom = y + h / 2;
    
    // Create an array to store separated digits of rule
    int rules[4] = {0, 0, 0, 0};
    for (int i = 0; i < 4; i++) {
        int v = rule / pow(10, 3-i);
        rules[i] = v;
    }

    // lx and ly are the _l_ocal coordinates
    for (int lx = left; lx < right; lx++) {
        for(int ly = top; ly < bottom; ly++) {
            int value = NUM(lx, ly);
            if (value < 4 && ofRandom(99) < p) {
                // Apply rule
                value = rules[value];
                PUT(lx, ly, value);
            }
        }
    }
}

/*
 > LOCOP (x,y,w,h,%,OK-counts,neighbors,these,rule) is a local operation, causing certain of the cells in the specified region to be changed according to the indicated rule: Those changed are the ones with acceptable counts of the designated adjacent cells holding appropriate numbers:
 */
// TODO LOCOP

/*
 > COMBN (x,y,w,h,%,xf,yf,orient,r0,rl,r2,r3) read "combine" - causes contents df the indicated percentage of x,y,w,h, to be changed by one of four rules, depending on contents of a corres- ponding cell in an area centered at (xf,yf). The result is thus a simple or complicated "combination" of two picture areas, and is imagined to come about as follows: a copy of the neighborhood of the "form" area centered at (xf,yf) is picked up, (re)oriented according to the value 1-8 of orient:
     1 as is
     2 rotate 90° clockwise
     3 rotate 180°
     4 rotate 90° counterclockwise
     5 flip right-left (r-l)
     6 flip r-l and rotate 90° clockwise
     7 flip r-l and rotate 180°
     8 flip r-l and rotate 90° counterclockwise
    and repositioned so that the central (xf,yf) cell of the "from" area is over (x,y) - the center of the area to be changed. Each affected cell is then processed by one of four translation rules.
 */
void COMBN(int x, int y, int w, int h, int p, int xf, int yf, int orient, int r0, int r1, int r2, int r3) {
    int left = x - w / 2;
    int top = y - h / 2;
    
    int leftf = xf - w / 2;
    int topf = yf - h / 2;
    
    // Making a matrix of rules being the first dimension the "from" value and the
    // the second is the "target" cell value rules[valuef][value]
    int rr[4] = { r0, r1, r2, r3 }; // Rules reference
    int rules[4][4];
    for (int i = 0; i < 4; i++) {
        for (int j = 0; j < 4; j++) {
            int rule_ref = rr[i];
            int v = rule_ref / pow(10, 3-j);
            v = v % 10;
            rules[i][j] = v;
        }
    }
    
    // Without orient: as is
    for (int lx = 0; lx < w; lx++) {
        for (int ly = 0; ly < h; ly++) {
            int valuef = NUM(leftf+lx, topf+ly);
            int value = NUM(left+lx, top+ly);
            int v = rules[valuef][value];
            switch (orient) {
                case 2: // 2 rotate 90° clockwise
                    PUT(left+w-1-ly, top+lx, v);
                    break;
                case 3: // 3 rotate 180°
                    PUT(left+w-1-lx, top+h-1-ly, v);
                    break;
                case 4: // 4 rotate 90° counterclockwise
                    PUT(left+ly, top+h-1-lx, v);
                    break;
                case 5: // 5 flip right-left
                    PUT(left+w-1-lx, top+ly, v);
                    break;
                case 6: // 6 flip r-l and rotate 90° clockwise
                    PUT(left+w-1-ly, top+h-1-lx, v);
                    break;
                case 7: // 7 flip r-l and rotate 180°
                    PUT(left+lx, top+h-1-ly, v);
                    break;
                case 8: // 8 flip r-l and rotate 90° counterclockwise
                    PUT(left+ly, top+lx, v);
                    break;
                default: // unknown and 1: as is
                    PUT(left+lx, top+ly, v);
                    break;
            }
            
        }
    }
    
}

void demo() {
    //    x   y    w    h   %   rule
    CHANJ(70, 70, 140, 140, 100, 1111);
    
    // Put tests
    //   x  y  nnnn
    PUT4(2, 2, 1232);
    PUT4(6, 2, 3212);
    // Out of bounds
    PUT4(138, 70, 3333);
    
    //    x   y   nnnn1 nnnn2 nnnn3 nnnn4
    PUT16(10, 10, 1111, 2222, 3333, 1233);
    // Snake
    PUT16(50, 40, 3311, 3333, 3311, 3311);
    PUT16(50, 39, 3311, 3311, 3311, 3311);
    PUT16(50, 38, 3311, 3311, 3311, 3311);
    PUT16(50, 37, 3333, 3311, 3333, 3311);
    
    
    // Combine test
    // Checker pattern to work with
    for (int i = 0; i < 10; i += 2) {
        PUT16(10, 95+i    , 3030, 3030, 3044, 4444);
        PUT16(10, 95+(i+1),  303,  303,  344, 4444);
    }
    
    SHOW(70, 70, 140, 140);
    
    //    x    y   w   h    %   xf  yf   o   r0    r1   r2    r3
    //    COMBN(25, 100, 10, 10, 100, 15, 100, 1, 0, 1111, 2222, 3333); // a) stamp
    COMBN(25, 100, 10, 10, 100, 15, 100, 1, 123, 1123, 2223, 3333); // b) max values
    
    SHOW(70, 70, 140, 140);
}

void example_1() {
    CHANJ((7*18)/2, (7*18)/2, (7*18)+6, (7*18)+6, 100, 3333);
    
    PUT16(133, 139, 3, 304, 4444, 4444);
    PUT16(133, 138, 3333, 3304, 4444, 4444);
    PUT16(133, 137, 0, 4, 4444, 4444);
    PUT16(133, 136, 3303, 3334, 4444, 4444);
    PUT16(133, 135, 303, 4, 4444, 4444);
    PUT16(133, 134, 333, 4, 4444, 4444);
    PUT16(133, 133, 3, 4, 4444, 4444);
    
    for (int ix = 5; ix < 5+(7*18); ix += 7) {
        for (int iy = 5; iy < 5+(7*18); iy += 7) {
            COMBN(ix, iy, 7, 7, 100, 136, 136, NE(1, 8), 0, 1111, 2222, 3333);
        }
    }
    SHOW(70, 70, 140, 140);
}

//--------------------------------------------------------------
void ofApp::setup(){
    ofRectMode(OF_RECTMODE_CENTER);
    ofEnableSmoothing();
    
    for (int i = 0; i < 19600; i++) {
        image[i] = 0;
        display[i] = 0;
    }
    
    example_1();
}

//--------------------------------------------------------------
void ofApp::update(){
    
}

//--------------------------------------------------------------
void ofApp::draw(){
    ofBackground(200, 200, 200);
    ofRectMode(OF_RECTMODE_CENTER);
    ofSetColor(0, 0, 0);
    for (int x = 0; x < 140; x++) {
        for (int y = 0; y < 140; y++) {
            float lx = ofMap(x, 0, 140, 0, ofGetWidth());
            float ly = ofMap(y, 0, 140, 0, ofGetHeight());
            int i = x + y * 140;
            int value = DISPLAY(x, y);
            ofDrawRectangle(lx, ly, value, value);
        }
    }
}

//--------------------------------------------------------------
void ofApp::keyPressed(int key){

}

//--------------------------------------------------------------
void ofApp::keyReleased(int key){

}

//--------------------------------------------------------------
void ofApp::mouseMoved(int x, int y ){

}

//--------------------------------------------------------------
void ofApp::mouseDragged(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mousePressed(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mouseReleased(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mouseEntered(int x, int y){

}

//--------------------------------------------------------------
void ofApp::mouseExited(int x, int y){

}

//--------------------------------------------------------------
void ofApp::windowResized(int w, int h){

}

//--------------------------------------------------------------
void ofApp::gotMessage(ofMessage msg){

}

//--------------------------------------------------------------
void ofApp::dragEvent(ofDragInfo dragInfo){ 

}
